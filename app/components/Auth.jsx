import React from 'react';
import axios from 'axios';
import Router from 'react-router/BrowserRouter'
import Redirect from 'react-router/Redirect'
import Snackbar from 'material-ui/Snackbar';
import Login from './Login';
import Signup from './Signup';

// const PosterImage='./img/posters.png';
const PosterImage1='https://images.bigcartel.com/product_images/159878917/AmericanFootball_SongExploder_FinalScan_1200px.jpg?auto=format&fit=max&h=1000&w=1000';
const PosterImage2='https://images.bigcartel.com/product_images/189275951/NickelCreek_WDC_FinalScan_1200px.jpg?auto=format&fit=max&h=1000&w=1000';
const PosterImage3='http://furturtle.com/images/posters/ironandwine09.jpg';
const PosterImage4='http://images.bigcartel.com/product_images/178653131/MMJ_Houston2016.jpg?auto=format&fit=max&h=1000&w=1000';
const PosterImage5='https://images.bigcartel.com/product_images/169116565/Baths_FinalScan_800px.jpg?auto=format&fit=max&h=1000&w=1000';
const PosterImage6='http://images.bigcartel.com/product_images/186193982/Screen_Shot_2016-09-06_at_3.02.46_PM.png?auto=format&fit=max&h=1000&w=1000';
const PosterImage7='http://images.bigcartel.com/product_images/186194888/BoH_SF.jpg?auto=format&fit=max&h=1000&w=1000';
const PosterImage8='https://images.bigcartel.com/product_images/130297881/AmosLee_tour_FinalScan_1200px.jpg?auto=format&fit=max&h=1000&w=1000';
const PosterImage9='http://images.bigcartel.com/product_images/176562674/JohnPrine_NYBOS.jpg?auto=format&fit=max&h=1000&w=1000';
const PosterImage10='http://images.bigcartel.com/product_images/148764601/OCMS_Fall-2014.jpg?auto=format&fit=max&h=1000&w=1000';
const PosterImage11='https://mir-s3-cdn-cf.behance.net/project_modules/disp/6d2fa72033378.560118f8d8284.jpg';
const PosterImage12='http://images.bigcartel.com/product_images/157924645/Tame-Impala_foil.jpg?auto=format&fit=max&h=1000&w=1000';
const PosterImage13='http://images.bigcartel.com/product_images/188942645/MMW_25yrs_Cleveland.jpg?auto=format&fit=max&h=1000&w=1000';
const PosterImage14='http://3.bp.blogspot.com/-NXGS0UEpQxQ/UQrxySOde6I/AAAAAAAAA1c/PrnqZI1xpnE/s1600/LumineersTerminal5BuckScreenShot.png';
const PosterImage15='http://images.bigcartel.com/product_images/187628906/MMJ_Asheville2016.jpg?auto=format&fit=max&h=1000&w=1000';
const PosterImage16='https://images.bigcartel.com/product_images/189275426/JBT_RedRocks_FinalScan_1500px.jpg?auto=format&fit=max&h=1000&w=1000';
const PosterImage17='https://images.bigcartel.com/product_images/189242096/DMB_WPB_N2_FinalScan_1500px.jpg?auto=format&fit=max&h=1000&w=1000';
const PosterImage18='https://images.bigcartel.com/product_images/128253432/GrandPointNorth_FinalScan_1200px.jpg?auto=format&fit=max&h=1000&w=1000';

const Auth = React.createClass({
  getInitialState() {
    return {
      login: true,
      open: false,
      open1: false,
      open2: false
    }
  },

  componentDidMount() {
    this.setState({ open: false, open1: false, open2: false });
  },

  userLogin(user) {
    axios.post('/token', user)
      .then((res) => {
        if (res) {
          // this.props.authCheck();
          this.setState({ open: true });
          window.location.pathname = '/Calendar';
        }
        else {
          this.setState({ open2: true});
        }
      })
      .catch((err) => {
        console.log(err);
      })
  },

  userSignup(user) {
    let userEmail = user.email;
    let userPassword = user.password;

    axios.post('/users', user)
      .then((res) => {
        if (res.data.email === userEmail) {
          axios.post('/token', {
            email: userEmail,
            password: userPassword
          })
          .then((response) => {
            if (response) {
              // this.props.authCheck();
              this.setState({ open1: true });
              window.location.pathname = '/Calendar';
            }
            else {
              this.setState({ open2: true});
            }
          })
          .catch((err) => {
            console.log(err);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  loginRender() {
    this.setState({ login: true });
  },

  signupRender() {
    this.setState({ login: false });
  },

  render() {
    let loginForm = null;
    let signup = null;

    if (this.state.login) {
      loginForm = <Login
        open={this.state.open}
        open2={this.state.open2}
        login={this.userLogin}
        signupRender={this.signupRender}
      />
    }
    else {
      signup = <Signup
        open1={this.state.open1}
        open2={this.state.open2}
        signup={this.userSignup}
        loginRender={this.loginRender}
     />
    }

    return (
      <div id="overlay">
      <div id="Auth">

        <div id="wrapper">
          <div id="masonry-column-container">
            <div className="brick-item">
              <img className="twelve columns" src={PosterImage1} />
            </div>
            <div className="brick-item">
              <img className="twelve columns" src={PosterImage2} />
            </div>
            <div className="brick-item">
              <img className="twelve columns" src={PosterImage3} />
            </div>
            <div className="brick-item">
              <img className="twelve columns" src={PosterImage4} />
            </div>
            <div className="brick-item">
              <img className="twelve columns" src={PosterImage5} />
            </div>
            <div className="brick-item">
              <img className="twelve columns" src={PosterImage6} />
            </div>
            <div className="brick-item">
              <img className="twelve columns" src={PosterImage7} />
            </div>
            <div className="brick-item">
              <img className="twelve columns" src={PosterImage8} />
            </div>
            <div className="brick-item">
              <img className="twelve columns" src={PosterImage9} />
            </div>
            <div className="brick-item">
              <img className="twelve columns" src={PosterImage10} />
            </div>
            <div className="brick-item">
              <img className="twelve columns" src={PosterImage11} />
            </div>
            <div className="brick-item">
              <img className="twelve columns" src={PosterImage12} />
            </div>
            <div className="brick-item">
              <img className="twelve columns" src={PosterImage13} />
            </div>
            <div className="brick-item">
              <img className="twelve columns" src={PosterImage14} />
            </div>
            <div className="brick-item">
              <img className="twelve columns" src={PosterImage15} />
            </div>
            <div className="brick-item">
              <img className="twelve columns" src={PosterImage16} />
            </div>
            <div className="brick-item">
              <img className="twelve columns" src={PosterImage17} />
            </div>
            <div className="brick-item">
              <img className="twelve columns" src={PosterImage18} />
            </div>
          </div>
         </div>
        {loginForm}
        {signup}
        </div>
      </div>
    );
  }
});

export default Auth;
