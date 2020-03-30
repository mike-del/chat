import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from "./components/Join/join";
import chat from "./components/Chat/chat";

const App =() => (
    <Router>
        <Route path="/" exact component={Join} />
        <Route path="/chat" component={chat} />
    </Router>
);


export default App
