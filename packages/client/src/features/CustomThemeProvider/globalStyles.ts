import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    html {
      height: 100%;
      width: 100%;
    }

    body {
      min-height: 100%;
      width: 100%;
    }

    a {
      text-decoration: none;
    };

    #root {
      position: fixed;
      overflow: auto;
      height: 100vh;
      width: 100%;
    }
`;
