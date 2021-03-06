import { Link } from 'react-router-dom';
import Particles from 'react-tsparticles';

import { Routes } from 'common/routes';

import ParticlesOptions from './particles-config.json';

import './NotFoundPage.scss';

const NotFoundPage = () => {
    return (
        <>
            <Particles options={ParticlesOptions} />
            <div className="card">
                <h1 className="caption">404 | Not Found</h1>
                <p>Page you are looking for does not exist.</p>
                <p>
                    <Link to={Routes.Page.Home}>Return home</Link>
                </p>
            </div>
        </>
    );
};

export default NotFoundPage;
