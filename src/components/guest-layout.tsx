import React, { Props } from 'react';
import Header from './header';
import Footer from './footer';

const guestLayout = (props: Props<any>): JSX.Element => {
    // eslint-disable-next-line
  const { children } = props;
    return (
        <div>
            <Header />
            {children}
            <br />
            <Footer />
        </div>
    );
};

export default guestLayout;
