import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
    // getInitialProps = _app.js, _document.js서만!! 사용하는 특수한 SSR 메서드
    // 기본꼴
    static async getInitialProps(ctx) {
            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
        }
    }
    // _document.js 기본꼴 _app.js가 감싸지면서 Html,Head, body를 수정가능 해진다
    render() {
        return (
            <Html>
                <Head />
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }

}
