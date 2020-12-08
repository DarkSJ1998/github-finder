import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import devInfo from '../../devInfo.json';

const About = () => {
	const { developerId, developerName } = devInfo;

	return (
		<Fragment>
			<h1>About This App</h1>
			<p>App to search Github users</p>
			<p>Based on a tutorial by Brad Traversy</p>
			<p>Version: 1.1.0</p>

			<p>
				Developed by -{' '}
				<Link to={'/user/' + developerId}>
					@{developerId} ({developerName})
				</Link>
			</p>
			<p>
				Originally developed by -{' '}
				<Link to={'/user/bradtraversy'}>
					@bradtraversy (Brad Traversy)
				</Link>
			</p>
		</Fragment>
	);
};

export default About;
