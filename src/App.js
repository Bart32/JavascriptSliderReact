import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.startSlider = this.startSlider.bind(this);
    this.state = {
      imagesArray: ["css", "html", "javascript"],
      slide: 1,
      createdImages: [ ]
    };
  }
  componentWillMount() {
    this.setState({
      createdImages: this.state.imagesArray.map((image, index) => {
        return (
          <img
            alt={'photos'}
            key={image}
            className={index === 0 ? "active" : ""}
            src={require(`./img/${image}.png`)}
          />
        );
      })
    });
  }

  
  startSlider(){
    this.setState(previousState => {
      return {
        slide: previousState.slide +1,
        createdImages: this.state.imagesArray.map((image, index) => {
          return (
            <img
              alt={'photos'}
              key={image}
              className={index === this.state.slide ? "active" : ""}
              src={require(`./img/${image}.png`)}
            />
          );
        })
      };
    });
    if(this.state.slide === this.state.imagesArray.length){
      this.setState({
          slide:0
      });
    }
  }
  
  componentDidMount() {
    this.sliderInterval = setInterval(this.startSlider, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.sliderInterval);
  }

  thumbnails(e){
    clearInterval(this.sliderInterval);


  document.getElementsByClassName('active')[0].setAttribute("class", "");  // Removing actual 'active' class
  let imgIndex = parseInt(e.target.id, 10) // Getting id of clicked thumbnail
  this.setState({
      createdImages: this.state.imagesArray.map((image, index) => {
        return (
          <img
          alt={'photos'}
            key={image}
            className={index === imgIndex ? "active" : ""}
            src={require(`./img/${image}.png`)}
          />
        );
      }),
      slide: imgIndex
  });
  this.sliderInterval = setInterval(this.startSlider, 3000);
  }

  render() {
    return (
      <div id="sliderBox">
        <div id="slider">
          {this.state.createdImages}
        </div>
        <div id="thumbnails">
        {this.state.imagesArray.map((image, index) => {
          return (
            <img

            id={index}
            onClick={this.thumbnails.bind(this)}
            alt={'photos'}
              key={image}
              src={require(`./img/${image}.png`)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
export default App;
