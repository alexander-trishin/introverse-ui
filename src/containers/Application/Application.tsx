import React from 'react';
import { Helmet } from 'react-helmet';

const Application = () => (
    <>
        <Helmet>
            <title>Introverse</title>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
        </Helmet>
        <div>It's alive...</div>
    </>
);

export default Application;
