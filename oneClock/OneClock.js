/**
 * @Version 1.0.3
 * @author Zachary_M
 * @date 2018.9.11
 * @brief
 *   本人写的第一个脚本，真"从0开始写js",写的稀烂,望多多体谅。食用方法：双击更换主题
 *   该脚本是对app"oneClock"其中一个界面的实现,原app的翻页效果比较有趣，个人能力有限无法实现
 *   1.修改了布局相关的代码，尝试对iphonex屏幕尺寸做适配,
 *   2.添加了检测版本相关的代码
 *   感谢lco lok大佬的帮助
 * @/brief
 */
const version =1.03;
const scriptName=$addin.current.name
scriptVersionUpdate();

$app.idleTimerDisabled //禁用息屏
//屏幕方向检测
let checkVertical=function() {
  let orientation=$device.info["screen"]["orientation"]
  if(orientation==3||orientation==4){
    return false  
  }else if(orientation==1){
    return true
  }else{
    return $device.info["screen"]["width"].toString()<$device.info["screen"]["height"].toString()?true:false //手机平放时获取当前的屏幕状态
  }
}
//部件大小设置
if (checkVertical()){
  var screenWidth=$device.info["screen"]["width"]
  var screenHeight=$device.info["screen"]["height"]  
}else{
  var screenHeight=$device.info["screen"]["width"]
  var screenWidth=$device.info["screen"]["height"]
}
//获取屏幕信息
var isVertical=checkVertical()
var isIpad = $device.isIpad;
var isIpadPro = $device.isIpadPro;
var isIphoneX = $device.isIphoneX;
let cardsDistance = 40//卡片之间的距离
let cardLength=isIpad||isIpadPro?0.55*screenWidth:2/3*screenWidth+3//卡片边长，暂时处理成正方形
let frameWidth=cardLength //容纳卡片的frame宽度
let frameHeight=cardsDistance+2*cardLength//容纳卡片的frame宽度
let timeFontSize = 0.72*cardLength; //时钟的字体大小
let blankBarHeight = 5; //黑边遮挡条的宽度
var theme = "black";//默认黑色主题

let themeColor = {
  "white": {
    "bgColor": $color("#FFFFFF"),
    "viewColor": $color("#F2F2F2"),
    "textColor": $color("#000000")
  },
  "black": {
    "bgColor": $color("#000000"),
    "viewColor": $color("#191919"),
    "textColor": $color("#B8B8B8")
  }
};//主题配色

if (typeof $cache.get("theme") == "undefined") {
  theme = "black"; //默认主配色
} else {
  theme = $cache.get("theme");
}

let timeFormate = function(time) {
  if (time < 10) {
    return "0" + time.toString();
  } else {
    return time.toString();
  }
}; //时间字符串格式化输出

let labelHour = timeFormate(new Date().getHours()); //初始化小时数
let labelMinute = timeFormate(new Date().getMinutes()); //初始化分钟数

let apm = function(hour) {
  if (hour >= 12) {
    return "PM";
  } else {
    return "AM";
  }
}; //am,pm判断

main();
var timer = $timer.schedule({
  interval: 0.5,
  handler: function() {
    let date = new Date();
    let chour = timeFormate(date.getHours());
    let cminute = timeFormate(date.getMinutes());
    if ($("minutes").text != cminute || $("hours").text != chour) {
      $ui.animate({
        duration: 0.4,
        animation: function() {
          $("hours").text = chour;
          $("minutes").text = cminute;
          let capm=apm($("hours").text)
          if (capm != $("APMLabel").text) {
            $("APMLabel").text = capm;
            if (capm == "AM") {
              $("APMLabel").remakeLayout(function(make) {
                make.left.top.inset(20);
              });
            } else {
              $("APMLabel").remakeLayout(function(make) {
                make.left.bottom.inset(20);
              });
            }
          }
        }
      });
    }
    if(checkVertical()!=isVertical){
      isVertical=!isVertical;
      $("frameView").updateLayout(function(make) {
        make.left.right.inset((isVertical?screenWidth-frameWidth:screenHeight-frameHeight)/2);
        make.top.bottom.inset((isVertical?screenHeight-frameHeight:screenWidth-frameWidth)/2)
      })
    }
  }
}); //定时任务，定时改变界面元素

function main() {
  $ui.render({
    props: {
      id: "background",
      navBarHidden: true,
      statusBarHidden: true,
      bgcolor: themeColor[theme]["bgColor"]
    },
    events: {
      doubleTapped: function(sender) {
        changeTheme();
      }
    },
    views: [
      {
        type:"view",
        props: {
          id: "frameView",
          bgcolor: themeColor[theme]["bgColor"],
        },
        layout: function(make, view) {
          make.left.right.inset((isVertical?screenWidth-frameWidth:screenHeight-frameHeight)/2);
          make.top.bottom.inset((isVertical?screenHeight-frameHeight:screenWidth-frameWidth)/2)
        },
        views:[
          {
            type: "view",
            props: {
              id: "hoursView",
              bgcolor: themeColor[theme]["viewColor"],
              smoothRadius: 20
            },
            layout: function(make, view) {
              make.top.left.inset(0);
              make.size.equalTo($size(cardLength, cardLength));
            },
    
            views: [
              {
                type: "label",
                props: {
                  id: "hours",
                  text: labelHour,
                  align: $align.center,
                  textColor: themeColor[theme]["textColor"],
                  font: $font("TimesNewRomanPS-BoldMT", timeFontSize)
                },
                layout: function(make, view) {
                  make.center.equalTo(view.super);
                }
              },
              {
                type: "label",
                props: {
                  id: "APMLabel",
                  text: apm(labelHour),
                  align: $align.center,
                  textColor: themeColor[theme]["textColor"],
                  font: $font(0.08*cardLength)
                },
                layout: function(make, view) {
                  if (apm($("hours").text) == "PM") {
                    make.left.bottom.inset(20);
                  } else {
                    make.left.top.inset(20);
                  }
                }
              },
              {
                type: "view",
                props: {
                  id: "blankBarHours",
                  bgcolor: themeColor[theme]["bgColor"]
                },
                layout: function(make, view) {
                  make.center.equalTo(view.super);
                  make.width.equalTo(view.super.width),
                  make.height.equalTo(blankBarHeight);
                }
              },
            ]
          },
          {
            type: "view",
            props: {
              id: "minutesView",
              bgcolor: themeColor[theme]["viewColor"],
              smoothRadius: 20
            },
            layout: function(make, view){
              make.right.bottom.inset(0);
              make.size.equalTo($size(cardLength, cardLength));
            },
            views: [
              {
                type: "label",
                props: {
                  id: "minutes",
                  text: labelMinute,
                  align: $align.center,
                  textColor: themeColor[theme]["textColor"],
                  font: $font("TimesNewRomanPS-BoldMT", timeFontSize)
                },
                layout: function(make, view) {
                  make.center.equalTo(view.super);
                }
              },
              {
                type: "view",
                props: {
                  id: "blankBarMinutes",
                  bgcolor: themeColor[theme]["bgColor"]
                },
                layout: function(make, view) {
                  make.center.equalTo(view.super),
                  make.width.equalTo(view.super.width),
                  make.height.equalTo(blankBarHeight);
                }
              }
            ]
          }
        ]
      }
    ]
  });
}
let changeTheme = function() {
  if (theme == "black") {
    $cache.set("theme", "white");
  } else {
    $cache.set("theme", "black");
  }
  theme = $cache.get("theme");
  $("background").bgcolor = themeColor[theme]["bgColor"];
  $("frameView").bgcolor = themeColor[theme]["bgColor"];
  $("blankBarHours").bgcolor = themeColor[theme]["bgColor"];
  $("blankBarMinutes").bgcolor = themeColor[theme]["bgColor"];
  $("hoursView").bgcolor = themeColor[theme]["viewColor"];
  $("minutesView").bgcolor = themeColor[theme]["viewColor"];
  $("hours").textColor = themeColor[theme]["textColor"];
  $("minutes").textColor = themeColor[theme]["textColor"];
  $("APMLabel").textColor = themeColor[theme]["textColor"];
  $device.taptic(1);
};//处理双击更换主题的事件

function scriptVersionUpdate(){
  $http.get({
    url: "https://raw.githubusercontent.com/ZacharyQin/oneClock-for-jsbox/master/updateInfo.js",
    handler: function(resp) {
      let newVersion = resp.data.version;
      let msg =resp.data.msg;
      if(newVersion>version){
        $ui.alert({
          title: `已有新版本发布!V${newVersion}`,
          message: `是否更新？\n更新完成后将自动重启脚本。\n${msg}`,
          actions:[{
            title:"更新",
            handler:function(){
                url="https://raw.githubusercontent.com/ZacharyQin/oneClock-for-jsbox/master/OneClock.js"
                $http.download({
                          url: encodeURI(url),
                          handler: resp => {
                            let box = resp.data
                            $addin.save({
                              name: scriptName,
                              data: box,
                              version: newVersion,
                              author: "ZacharyQin",
                              icon: "icon_040.png",
                              handler: (success) => {
                                if (success) {
                                  $device.taptic(2)
                                  $ui.toast("更新完成")
                                  $delay(2, function() {
                                    $device.taptic(2)
                                    $app.openExtension($addin.current.name)
                                  })
                                }
                              }
                            })
                        }
                    })
            }    
          },
          {
            title:"取消"
          }
        ]
        });
      }
    }
  })
}
