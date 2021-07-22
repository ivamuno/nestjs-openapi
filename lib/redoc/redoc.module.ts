import { HttpServer, INestApplication } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { resolve } from 'url';

import { LogoOptions, RedocDocument, RedocOptions } from './interfaces';
import { redocHandlebars } from './views/redocHandlebars';
// tslint:disable-next-line: no-var-requires
const expressAuth = require('express-basic-auth');
// tslint:disable-next-line: no-var-requires
const Handlebars = require('handlebars');

export class RedocModule {
    /**
     * Setup ReDoc frontend
     * @param path - path to mount the ReDoc frontend
     * @param app - NestApplication
     * @param document - Swagger document object
     * @param options - Init options
     */
    public static async setup(path: string, app: INestApplication, document: any, options: RedocOptions): Promise<void> {
        // Validate options object
        const defaultOption: RedocOptions = {
            untrustedSpec: false,
            supressWarnings: true,
            hideHostname: false,
            requiredPropsFirst: true,
            sortPropsAlphabetically: false,
            showExtensions: false,
            noAutoAuth: true,
            pathInMiddlePanel: false,
            hideLoading: false,
            nativeScrollbars: false,
            hideDownloadButton: false,
            disableSearch: false,
            onlyRequiredInSamples: false,
        };
        options = { ...defaultOption, ...options };
        try {
            const redocDocument = this.addVendorExtensions(options, document as RedocDocument);
            const httpAdapter: HttpServer = app.getHttpAdapter();
            if (httpAdapter && httpAdapter.constructor && httpAdapter.constructor.name === 'FastifyAdapter') {
                return this.setupFastify();
            }
            return await this.setupExpress(path, app as NestExpressApplication, redocDocument, options);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Setup fastify (not implemented yet)
     */
    private static async setupFastify(): Promise<void> {
        throw new Error('Fastify is not implemented yet');
    }

    /**
     * Setup ReDoc frontend for express plattform
     * @param path - path to mount the ReDoc frontend
     * @param app - NestApplication
     * @param document - ReDoc document object
     * @param options - Init options
     */
    private static async setupExpress(path: string, app: NestExpressApplication, document: RedocDocument, options: RedocOptions) {
        const httpAdapter = app.getHttpAdapter();
        // Normalize URL path to use
        const finalPath = this.normalizePath(path);
        // Add a slash to the end of the URL path to use in URL resolve function
        const resolvedPath = finalPath.slice(-1) !== '/' ? finalPath + '/' : finalPath;
        // Serve swagger spec in another URL appended to the normalized path
        const docUrl = resolve(resolvedPath, `${options.docName}.json`);
        // create helper to convert metadata to JSON
        Handlebars.registerHelper('toJSON', (object: any) => {
            return JSON.stringify(object);
        });
        // spread redoc options
        const { title, favicon, theme, ...otherOptions } = options;
        // create render object
        const renderData = {
            data: {
                title,
                docUrl,
                favicon,
                options: otherOptions,
                ...(theme && {
                    theme: {
                        ...theme,
                    },
                }),
            },
        };

        // get handlebars rendered HTML
        const redocHTML = Handlebars.compile(redocHandlebars)(renderData);
        // Serve ReDoc Frontend
        httpAdapter.get(finalPath, async (req: Request, res: Response) => {
            const sendPage = () => {
                // Content-Security-Policy: worker-src 'self' blob:
                res.setHeader(
                    'Content-Security-Policy',
                    // tslint:disable-next-line: max-line-length
                    'default-src * \'unsafe-inline\' \'unsafe-eval\'; script-src * \'unsafe-inline\' \'unsafe-eval\'; child-src * \'unsafe-inline\' \'unsafe-eval\' blob:; worker-src * \'unsafe-inline\' \'unsafe-eval\' blob:; connect-src * \'unsafe-inline\'; img-src * data: blob: \'unsafe-inline\'; frame-src *; style-src * \'unsafe-inline\';'
                );
                // whoosh
                res.send(redocHTML);
            };
            if (options.auth?.enabled) {
                const { user, password } = options.auth;
                expressAuth({ users: { [user]: password }, challenge: true })(req, res, () => {
                    sendPage();
                });
            } else {
                sendPage();
            }
        });
        // Serve swagger spec json
        httpAdapter.get(docUrl, (req: Request, res: Response) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(document);
        });
    }

    /**
     * Normalize path string
     * @param path - Path string
     */
    private static normalizePath(path: string): string {
        return path.charAt(0) !== '/' ? '/' + path : path;
    }

    /**
     * Add any vendor options if they are present in the options object
     * @param options options object
     * @param document redoc document
     */
    private static addVendorExtensions(options: RedocOptions, document: RedocDocument): RedocDocument {
        if (options.logo) {
            const logoOption: Partial<LogoOptions> = { ...options.logo };
            document.info['x-logo'] = logoOption;
        }

        if (options.tagGroups) {
            document['x-tagGroups'] = options.tagGroups;
        }

        return document;
    }
}
