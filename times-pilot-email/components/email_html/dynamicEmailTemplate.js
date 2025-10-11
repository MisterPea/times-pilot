export const emailTemplate = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="color-scheme" content="light only">
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <!--<![endif]-->
  <!--[if (gte mso 9)|(IE)]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
  <!--[if (gte mso 9)|(IE)]>
  <style type="text/css">
    body {width: 600px;margin: 0 auto;}
    table {border-collapse: collapse;}
    table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
    img {-ms-interpolation-mode: bicubic;}
  </style>
<![endif]-->
  <style>
    @import url("https://use.typekit.net/xvw4cbq.css");
  </style>
  <style type="text/css">
    body,
    html {
      background-color: #FFFFFF !important;
    }

    .headline {
      font-family: "museo-slab-rounded", serif;
      font-weight: 500;
      font-style: normal;
      font-size: 30px;
      color: #262626;

    }

    h3 {
      font-family: "museo-slab-rounded", serif;
      font-weight: 500;
      color: #4f4f4f;
    }

    p {
      font-family: forma-djr-micro, sans-serif;
      font-weight: 400;
      font-style: normal;
      font-size: 14px;
      letter-spacing: 0.04em;
      color: #4f4f4f;
    }

    .abstract-text {
      margin: 0;
    }

    .article-title,
    .section-title {
      font-family: forma-djr-micro, sans-serif;
      font-weight: 500;
      font-style: normal;
      font-size: 18px;
      margin: 0;
      color: #262626;
    }

    .section-title {
      padding-bottom: 5px;
    }

    .article-wrapper {

      display: flex;
      flex-direction: row;
    }


    a,
    li {
      text-decoration: none;
      color: #000000;
      list-style: none;
    }

    li {
      margin-bottom: 15px;
      margin-left: 5px;
    }

    li:first-child {
      margin-top: 10px
    }

    li:last-child {
      margin-bottom: 10px;
    }

    a {
      display: flex;
    }

    ul {
      padding: 0;
    }

    .section-ul {
      padding: 10px;
      background-color: #f7f2e9;
      border-radius: 5px;
      margin-bottom: 30px;
    }


    .img-wrapper {
      width: 70px;
      height: 100%;
      margin-right: 20px;
      object-fit: contain;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    img {

      border: 0.5px solid rgba(0, 0, 0, 0.5);
      border-radius: 12px;
    }

    .main-wrapper {
      max-width: 700px;
      margin: 0 auto;
    }

    .section-li {
      display: flex;
      flex-direction: column;
    }

    @media screen and (max-width:600px) {
      .headline {
        margin-bottom: 0;
        font-size: 24px;
      }

      .date {
        margin-top: 0;
        font-size: 18px;
      }

      p {
        font-size: 13px;
      }

      .article-title,
      .section-title {
        font-size: 15px;
      }

      .img-wrapper {
        width: 50px;
        height: 100%;
        margin-right: 10px;
      }

      .section-ul {
        margin-bottom: 20px;
      }

      .section-li {
        margin-top: 15px;
        padding-bottom: 15px;
        width: 100%;
        border-bottom: burlywood 1px solid;
      }

      .section-li:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 5px;
      }

      .section-li:first-child {
        margin-top: 0;
      }
    }
  </style>
  <!--user entered Head Start-->
  <!--End Head user entered-->
</head>

<body>
  <center>
    <header>
      <h1 class="headline">Daily Stories</h1>
      <h3 class="date">For {{date}}</h3>
      <hr />
    </header>
  </center>
  <main class="main-wrapper">
    <p class="name">Good Day, {{displayName}}!</p>
    <p>Here are your most up-to-date articles</p>
    <ul>
      {{#each searchArticles}}
      <li>
        <h5 class="section-title">• Articles related to: {{this.sectionTitle}}</h5>
        <ul class="section-ul">
          {{#each articles}}
          <li class="section-li">
            <a href={{this.web_url}}>
              <div class="article-wrapper">
                <div class="img-wrapper">
                  <img src={{this.thumbnail}} />
                </div>
                <div class="text-area">
                  <h5 class="article-title">{{this.headline}}</h5>
                  <p class="abstract-text">{{this.abstract}}</p>
                </div>
              </div>
            </a>
          </li>
          {{/each}}
        </ul>
      </li>
      {{/each}}
    </ul>
  </main>
</body>

</html>
`;



