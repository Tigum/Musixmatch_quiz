import React from 'react'
import { Switch, Route } from 'react-router-dom'
import WelcomeScreen from '../screens/WelcomeScreen'
import QuestionaryScreen from '../screens/QuestionaryScreen'
import RankingScreen from '../screens/RankingScreen'
import UserScreen from '../screens/UserScreen'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={WelcomeScreen} />
      <Route path='/questionary' component={QuestionaryScreen} />
      <Route path='/ranking' component={RankingScreen} />
      <Route path='/user' component={UserScreen} />
    </Switch>
  </main>
)

export default Main