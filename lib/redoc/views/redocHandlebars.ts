export const redocHandlebars = `<!DOCTYPE html>
<html>

<head>
  <title>{{ data.title }}</title>
  <!-- needed for adaptive design -->
  <meta charset="utf-8" />
  {{#if data.favicon}}
  <link rel="shortcut icon" type="image/x-icon" href="{{ data.favicon }}" />
  {{/if}}
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">
  <!--
    ReDoc doesn't change outer page styles
    -->
  <style>
    body {
      margin: 0;
      padding: 0;
    }
  </style>
</head>

<body>
  <!-- we provide is specification here -->
  <div id="redoc_container"></div>
  <script src="https://cdn.jsdelivr.net/npm/redoc-asyncapi/bundles/redoc.standalone.js"> </script>
  <script>
    let themeJSON = '{{{ toJSON data.theme }}}';
    if (themeJSON === '') { themeJSON = undefined }
    Redoc.init(
      '{{ data.docUrl }}',
      {
        ...(themeJSON && {
          theme: {
            ...JSON.parse(themeJSON)
          }
        }),
        ...JSON.parse('{{{ toJSON data.options }}}')
      },
      document.getElementById("redoc_container")
    );
  </script>
</body>

</html>`;
