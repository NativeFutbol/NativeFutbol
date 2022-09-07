<a name="readme-top"></a>
<!--
*** Thanks for checking out Native Futbol. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star! Thanks! 
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/NativeFutbol/NativeFutbol">
    <img src="https://raw.githubusercontent.com/NativeFutbol/README-assets/main/NativeFutbolLogo.png" alt="Logo" width="400" height="225">
  </a>
  
  <p align="center">
    Your go-to for all Europe's "Big Five" Football Leagues related!
    <br />
    <a href="https://github.com/NativeFutbol/NativeFutbol">View Demo</a>
    ·
    <a href="https://github.com/NativeFutbol/NativeFutbol/issues">Report Bug</a>
    ·
    <a href="https://github.com/NativeFutbol/NativeFutbol/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#app-demo">App Demo</a>
      <ul>
        <li><a href="#home-page">Home Page</a></li>
      </ul>
      <ul>
        <li><a href="#predictions">Predictions</a></li>
      </ul>
      <ul>
        <li>
          <a href="#stats">Stats</a>
          <ul>
            <li><a href="#countries">Countries</a></li>
          </ul>
          <ul>
            <li><a href="#leagues">Leagues</a></li>
          </ul>
          <ul>
            <li><a href="#teams">Teams</a></li>
          </ul>
          <ul>
            <li><a href="#players">Players</a></li>
          </ul>
        </li>
      </ul>
      <ul>
        <li><a href="#dream-team">Dream Team</a></li>
      </ul>
      <ul>
        <li><a href="#account">Account</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#meet-the-team">Meet The Team</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

Native Futbol is a mobile app designed to make soccer/football statistics and news accessible and easy to understand. The app provides numerous graphics based on the sport's history and recent events. It also presents the user with important recent and upcoming matches in a specified league, including useful analytics on the teams in those upcoming matches. Users are able to create a "Dream Team" with their favorite players to be engaged with the sport as well! Currently, the app provides information on Europe's "Big Five" Football Leagues, but it will include more leagues in the future. The aim of this app is to make soccer data more accessible and to interest newcomers into the world of soccer while keeping them engaged.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

Native Futbol is a mobile app created with React Native and Expo, focused on data visualization through charting technologies such as Victory and React Native Chart Kit. Guest information was stored locally with Async Storage, while registered user information was stored on Firebase's Cloud Database. Originally, D3.js was planned to be the main graphic library; however, unexpected compatibility issues with React Native arose. Exploring other options to create what was envisioned was the main lesson of this project.

* [![ReactNative][ReactNative.js]][ReactNative-url]
* [![Expo][Expo.js]][Expo-url]
* [![ReduxToolkit][ReduxToolkit.js]][ReduxToolkit-url]
* [![Firebase][Firebase.js]][Firebase-url]
* [Victory](https://formidable.com/open-source/victory/docs/native/)
* [React Native Chart Kit](https://github.com/indiespirit/react-native-chart-kit)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## App Demo

### ![Video Demo](youtube.com)

### Home Page

On the home page, there are automatic carousel views that the user can scroll through. The top section shows infomation about upcoming and recent matches of a football league, which can be changed by the dropdown. Recent events are displayed at the bottom, and they can be clicked on for the user to read more about. 

<div align="center">
<img src="https://media3.giphy.com/media/0VbGQi0icGMhXGjbz8/giphy.gif" width="250"/>&nbsp;&nbsp;&nbsp;
<img src="https://media2.giphy.com/media/zRHlttkqkzZ1uXf0vd/giphy.gif?cid=790b7611b3e977e570036a47facc3d193b081eff11706f7b&rid=giphy.gif&ct=g" width="250"/>&nbsp;&nbsp;&nbsp;
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Predictions

The predictions tab shows upcoming matches of the selected league. Users can click on a match to gain insight on the outcome of that match. Past matches between the two teams will be shown below, and performance graphs based on the teams' past performances can be viewed. 

<div align="center">
<img src="https://media3.giphy.com/media/9M63o6kUG7h5XPtCEh/giphy.gif?cid=790b76112f4569fa37a65063cbbdc3a74f6a02aa3e2cd9ef&rid=giphy.gif&ct=g" width="250"/>&nbsp;&nbsp;&nbsp;
<img src="https://media4.giphy.com/media/52yR9PH7Ef2sCTFzRo/giphy.gif?cid=790b7611cc82c6d5919bd8b10861114d3555627ec9ec2f97&rid=giphy.gif&ct=g" width="250"/>&nbsp;&nbsp;&nbsp;
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Stats

Tabs at the top of the stats tab allow the user to navigate to the category that they are interested in. Some of the screens have a search bar, which can be used to filter for the desired data. The season and league can be selected via their dropdowns, and both will persists between pages.

<div align="center">
<img src="https://media0.giphy.com/media/uCnvNSiQXVXBiV4G0M/giphy.gif" width="250"/>&nbsp;&nbsp;&nbsp;
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

#### Countries

Displayed is a world map, in which countries with data currently are highlighted in red. A country can be selected and deselected on the map, which will zoom accordingly. The selected country will appear above the map for the user to press on to be redirected. A list view of the countries is also available.

<div align="center">
<img src="https://media0.giphy.com/media/Uz808FpRi4Z0UbP9Dy/giphy.gif?cid=790b761175c3db30ee5c3844187a5d0a8fa293847b4e03e3&rid=giphy.gif&ct=g" width="250"/>&nbsp;&nbsp;&nbsp;
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

#### Leagues

Leagues can be pressed on to reveal the selected season's teams, which can be pressed on to be redirected. Available league stats are: team standings, top goal and assist makers, top red and yellow card receivers, and team rankings based on ranking and points.

<div align="center">
<img src="https://media0.giphy.com/media/YfLx7NzVOZQrzluf7F/giphy.gif?cid=790b76112888c5571d315e060cec4a28b9bafd2fe658c7dc&rid=giphy.gif&ct=g" width="250"/>&nbsp;&nbsp;&nbsp;
<img src="https://media4.giphy.com/media/4G0lwAoRshVuGEnxmh/giphy.gif?cid=790b7611eed0b4c115be82ab4f244d553267238d7fa9c57b&rid=giphy.gif&ct=g" width="250"/>&nbsp;&nbsp;&nbsp;
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

#### Teams

The current squad of the selected team will be displayed on a team's page. Users can view information about the team's current coach, venue, and season stats. In addition, the team can be compared to another team from any league.

<div align="center">
<img src="https://media1.giphy.com/media/9yhHEpSMhUGO2Y3JOn/giphy.gif?cid=790b7611310f8b3e5d128a5a996c2df1bbf38ed8b004cc6e&rid=giphy.gif&ct=g" width="250"/>&nbsp;&nbsp;&nbsp;
<img src="https://media1.giphy.com/media/szZy6mx6nlte4ErXYK/giphy.gif?cid=790b76115209809d1316ab8b1514fe5224591d88242d65ed&rid=giphy.gif&ct=g" width="250"/>&nbsp;&nbsp;&nbsp;
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

#### Players

Players of a team's season are displayed with twenty players on each page and can be filtered by the season's top performers. Demographics of a player can be viewed along with the player's performance over the years based on their position. Example statistics include minutes, rating, passes, goals and fouls.

<div align="center">
<img src="https://media2.giphy.com/media/MQqdnpT9f2iof8PUyv/giphy.gif?cid=790b76116faf02e966c4bff9c1eb16892a9cb180d6ec1ec6&rid=giphy.gif&ct=g" width="250"/>&nbsp;&nbsp;&nbsp;
<img src="https://media2.giphy.com/media/r4RCypGHSM1ye64xIa/giphy.gif?cid=790b7611c41871dc4385881d61880d09f5f48da67d6afc5b&rid=giphy.gif&ct=g" width="250"/>&nbsp;&nbsp;&nbsp;
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Dream Team

Users can draft a Dream Team with their favorite players or players that they believe will do well in the season. There are a variety of basic formations to choose from. Players can be found via the filters or the search bar above the player list. Players can be removed by deselecting them on the list or field and by pressing the Reset button. Guests have access to the Dream Team feature, but their rosters are stored locally on the device.

<div align="center">
<img src="https://media2.giphy.com/media/M32SJUibUWg3tb0Iir/giphy.gif?cid=790b7611c457f83123fab6ac54d96ba3053dd6eda3938354&rid=giphy.gif&ct=g" width="250"/>&nbsp;&nbsp;&nbsp;
<img src="https://media4.giphy.com/media/ien72UP8o8W3ninTV1/giphy.gif?cid=790b7611c23ae8931864cdf2aaf91781ecb846379f25a1ce&rid=giphy.gif&ct=g" width="250"/>&nbsp;&nbsp;&nbsp;
<img src="https://media1.giphy.com/media/dlaMNVVXZJAGYrHouo/giphy.gif?cid=790b76113932fc4a0fad88a90222a02aacfa5a2879c96528&rid=giphy.gif&ct=g" width="250"/>&nbsp;&nbsp;&nbsp;
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Account

Registered users' information, including their Dream Team, is stored on a Firebase cloud database. Users can edit their demographics or Dream Team and save them to the cloud database as well. Guests can easily create an account by filling out a form, which has validation to guide them.

<div align="center">
<img src="https://media1.giphy.com/media/5vmwWbqOFRV8sw7d03/giphy.gif?cid=790b7611a4b604e83e23974c79e46a3cd509cc0d124b2b8e&rid=giphy.gif&ct=g" width="250"/>&nbsp;&nbsp;&nbsp;
<img src="https://media3.giphy.com/media/DvrK3KvXp6vuiwFKa9/giphy.gif?cid=790b7611e43b8f981b841587b3f71758bac1c0c4913758b9&rid=giphy.gif&ct=g" width="250"/>&nbsp;&nbsp;&nbsp;
<img src="https://media1.giphy.com/media/4PyfCYrx6WqqlGkeEf/giphy.gif?cid=790b7611df4f00430c3539167a338575335bbd62feaadf0c&rid=giphy.gif&ct=g" width="250"/>&nbsp;&nbsp;&nbsp;
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

* Download your mobile simulator of choice.
  * [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12) - iOS Simulator for Mac
  * [Android Studio](https://developer.android.com/studio) - Android Simulator
  * [Expo Go](https://expo.dev/client) - Mobile Developer Simulator
      * Make an account with Expo.

* Get free API keys from [API-Football](https://www.api-football.com/) and [News API](https://newsapi.org/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Installation

1. Clone the repo.
   ```
   git clone https://github.com/NativeFutbol/NativeFutbol.git
   ```
2. Switch to installed directory and install NPM packages.
   ```
   cd [DIRECTORYLOCATION]
   npm install
   ```
   A force installation may be needed.
   ```
   npm install -f
3. Create a .env file in the root directory and enter your API keys.
   ```
   FOOTBALL_API_KEY = "[YOURAPIFOOTBALLKEY]"
   NEWS_API_KEY = "[YOURNEWSAPIKEY]"
   ```
4. Start the simulation environment and follow the instructions.
   ```
   npm start
   ```
  
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [ ] Deploy to mobile platforms
    - [ ] Apple App Store
    - [ ] Google Play Store
- [ ] Include data on more leagues 
- [ ] Add Fantasy Football experience
    - [ ] Scoring system for Dream Team performance
    - [ ] Ability to make and share games for friends to join
- [ ] Add Google Maps to Team Venue screen
- [ ] Add Google authentication to Login/Register
- [ ] Add forget password feature
- [ ] Explore D3.js for more advanced graphics

See the [open issues](https://github.com/NativeFutbol/NativeFutbol/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- Meet the Team -->
## Meet the Team

![Connor Choi](https://raw.githubusercontent.com/NativeFutbol/README-assets/main/Team_Profiles/Connor_Choi.png)  | ![Alexis Jimenez](https://raw.githubusercontent.com/NativeFutbol/README-assets/main/Team_Profiles/Alexis_Jimenez.png) | ![Fei Li](https://raw.githubusercontent.com/NativeFutbol/README-assets/main/Team_Profiles/Fei_Li.png)  | ![Kevin Liang](https://raw.githubusercontent.com/NativeFutbol/README-assets/main/Team_Profiles/Kevin_Liang.png) |
|     :---:     |     :---:     |     :---:     |     :---:     |
| Connor Choi  | Alexis Jimenez  | Fei Li  | Kevin Liang  |
| [Github](https://github.com/cc8516)  | [Github](https://github.com/AlexisJimenez0728)  | [Github](https://github.com/fei19904287)  | [Github](https://github.com/kevinliang327)  |
| -  | [LinkedIn](https://www.linkedin.com/in/alexis-jimenez-fwd/)  | [LinkedIn](https://www.linkedin.com/in/feili4287/)  | [LinkedIn](https://www.linkedin.com/in/kliang327/)

Project Link: [Native Futbol](https://github.com/NativeFutbol/NativeFutbol)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

The data used in this app was provided by the APIs below:
* [API-Footbal](https://www.api-football.com/)
* [News API](https://newsapi.org/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/NativeFutbol/NativeFutbol/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/NativeFutbol/NativeFutbol/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/NativeFutbol/NativeFutbol/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/NativeFutbol/NativeFutbol/issues

[product-screenshot]: /assets/field.jpg

[ReactNative.js]: https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[ReactNative-url]: https://reactnative.dev/
[Expo.js]: https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white
[Expo-url]: https://expo.dev/
[ReduxToolkit.js]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[ReduxToolkit-url]: https://redux-toolkit.js.org/
[Firebase.js]: https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black
[Firebase-url]: https://firebase.google.com/
