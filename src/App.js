import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  draw = () => {
    console.log('draw');
    const ballsList = [
      {
        text: '01',
        points: { x: 0, y: 0, x2: 0, y2: 0 }
      },
      {
        text: '02',
        points: { x: 0, y: 0, x2: 0, y2: 0 }
      },
      {
        text: '03',
        points: { x: 0, y: 0, x2: 0, y2: 0 }
      },
      {
        text: '04',
        points: { x: 0, y: 0, x2: 0, y2: 0 }
      },
      {
        text: '05',
        points: { x: 0, y: 0, x2: 0, y2: 0 }
      },
      {
        text: '06',
        points: { x: 0, y: 0, x2: 0, y2: 0 }
      },
      {
        text: '07',
        points: { x: 0, y: 0, x2: 0, y2: 0 }
      },
      {
        text: '08',
        points: { x: 0, y: 0, x2: 0, y2: 0 }
      },
      {
        text: '09',
        points: { x: 0, y: 0, x2: 0, y2: 0 }
      }
    ],
      R = 180,
      BR = 20;
    let x, y, x2, y2;
    let can = document.getElementById("can"),
      ctx = can.getContext("2d");
    ctx.beginPath();
    ctx.arc(200, 200, R, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();

    x = Math.random() * 20 + 40;
    for (let i = 0; i < ballsList.length; i++) {
      ctx.beginPath();
      x += Math.random() * (45 - 20) + 20;
      x2 = Math.random() * (360 - 40) + 40;
      y2 = Math.random() > 0.5 ? Math.sqrt(Math.pow(160, 2) - Math.pow((x2 - 200), 2)) + 200 : 200 - Math.sqrt(Math.pow(160, 2) - Math.pow((x2 - 200), 2));
      if (x > 350) {
        x = 350;
      }
      y = Math.random() * (210 - 190) + 200;
      ballsList[i].points = { x, y, x2, y2 };
      ctx.arc(x, y, BR, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fillText(ballsList[i].text, x - 6, y + 2)
      ctx.closePath()
    }
    this.excuteFun(ballsList, ctx, BR)

  }

  excuteFun = (list, ctx, BR) => {
    clearInterval(this.timer)
    let a, b, x2, y2;
    ctx.clearRect(0, 0, 400, 400);
    ctx.beginPath();
    ctx.arc(200, 200, 180, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    for (let i = 0; i < list.length; i++) {
      ctx.beginPath();
      a = list[i].points.x2 > list[i].points.x ? list[i].points.x + 20 : list[i].points.x - 20;
      b = list[i].points.y2 > list[i].points.y ? list[i].points.y + 20 : list[i].points.y - 20;
      if (list[i].points.x2 > list[i].points.x && a > list[i].points.x2 || list[i].points.x2 < list[i].points.x && a < list[i].points.x2 ||
        list[i].points.y2 > list[i].points.y && b > list[i].points.y2 || list[i].points.y2 < list[i].points.y && b < list[i].points.y2) {
        a = list[i].points.x2;
        b = list[i].points.y2;
        x2 = Math.random() * (360 - 40) + 40;
        y2 = list[i].points.y2 < 200 ? Math.sqrt(Math.pow(160, 2) - Math.pow((x2 - 200), 2)) + 200 : 200 - Math.sqrt(Math.pow(160, 2) - Math.pow((x2 - 200), 2));
        list[i].points = { x: a, y: b, x2, y2 }
      } else {
        list[i].points.x = a;
        list[i].points.y = b;
      }
      ctx.arc(a, b, BR, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fillText(list[i].text, a - 6, b + 2)
      ctx.closePath()
      ctx.restore()
    }
    this.timer = setInterval(function () {
      this.excuteFun(list, ctx, BR)
    }.bind(this), 50)
  }

  componentDidMount() {
    this.draw()
  }
  render() {
    return (
      <div className="App">
        <canvas id="can" width="400" height="400"></canvas>
      </div>
    );
  }
}

export default App;
