import * as React from "react";
import AppNavigator from "./AppNavigator";

/*
NOTE(CK): Apr 17 - We could put each api on its own page? Audio / SMS / Camera / Location
                   I am not sure what the structure looks like with firebase hooked up.
                   that might make things easier as you can access data throughout every page?

                   Currently have placeholder names for the props that get passed to each page 

                   I am going to put the authentication for firebase in the MenuScreen for now
                   should probably be abstracted into a module 

                   // The user you can login in with is
                   email = test@test.com
                   pass = apple123!

*/

export default function App() {
  return <AppNavigator />;
}
