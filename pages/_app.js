import '@styles/globals.css';
import Header from '@components/header';

function Application({ Component, pageProps }) {
  return (
    <>
      <Header>
        <Header.Brand text="Sylvano" />
        <Header.Menu>
          <Header.Nav>
            <Header.Item href="/" text="Home" />
            <Header.Item href="/archive" text="Archive" />
            <Header.Item href="/about" text="About" />
          </Header.Nav>
          <Header.Socials>
            <Header.Social href="https://www.instagram.com/javachinoe/" text="Instagram" />
            <Header.Social href="/" text="Snapchat" />
          </Header.Socials>
        </Header.Menu>
      </Header>
      <Component {...pageProps} />
    </>
  );
}

export default Application;
