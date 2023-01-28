import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    render() {
        return (
            <html>
                <Head>
                    <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
                    <title>Deviants Silver Pass</title>
                    <meta charset="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, minimum-scale=1"
                    />
                    <meta name="description" content="deviants silver pass" />
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="apple-touch-icon" href="/logo.png" />
                    <meta property="og:title" content="Deviants Silver Pass" />
                    <meta property="og:site_name" content="DeviantsNft" />
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/apple-touch-icon.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/favicon-16x16.png"
                    />
                    <link rel="manifest" href="/site.webmanifest" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}