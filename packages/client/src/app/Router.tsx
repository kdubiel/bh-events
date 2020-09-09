import React, { Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Main } from 'layouts';
import { RouteProps } from 'react-router-dom';
import { lazy } from 'react';
import { Loader } from 'components';
import { Box } from '@material-ui/core';

const Events = lazy(() => import('pages/Events/Events'));

const routes: RouteProps[] = [
  {
    path: '/events',
    component: Events,
  },
];

export const Router = () => {
  return (
    <BrowserRouter>
      <Main>
        <Switch>
          <Suspense
            fallback={
              <Box justifyContent="center" display="flex">
                <Loader />
              </Box>
            }
          >
            {routes.map(({ path, component }, i) => (
              <Route key={i} path={path} component={component} />
            ))}
            <Route exact path="/">
              <Redirect to="/events" />
            </Route>
          </Suspense>
        </Switch>
      </Main>
    </BrowserRouter>
  );
};
