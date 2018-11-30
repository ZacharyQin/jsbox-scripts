let duration = 0; //每个动画文件的总帧数
let durationTime=0;//每个动画文件的总时间
let framePerSec=0;
let currentFrame = 0; //手势操作-当前所在的帧数
let fixedFrame = 0; //手势操作-当前移动后所在的帧数
let currentRate = 1; //手势操作-当前播放速率
let fixedRate = 1; //手势操作-当前移动后的速率
let normalSize = $size(375, 375); //动画大小
let btnSize = $size(45, 45); //下方按键大小
$cache.set("editModeFlag", false)
let universalContainer = {
  type: "view",
  props: {
    id: "universalContainer",
    bgcolor: $color("#EEF1F1"),
    radius: 20,
    borderColor: $color("black"),
    borderWidth: 1,
    alpha: 0
  },
  layout: (make, view) => {
    make.centerX.equalTo($("buttonContainer").centerX);
    make.bottom.equalTo($("buttonContainer").top);
    make.height.width.equalTo(0);
  },
  views:[{
    type: "view",
    props: {
      id: "universalView",
      bgcolor: $color("clear"),
      radius: 20,
    },
    layout:$layout.fill
  }],
  events: {
    tapped: sender => {}
  }
};
let openBtn = {
  type: "button",
  props: {
    id: "OPEN",
    image: $file.read("./assets/category.png").image,
    bgcolor: $color("clear")
  },
  layout: (make, view) => {
    make.centerY.equalTo(view.super.centerY);
    make.left.inset(15);
    make.size.equalTo(btnSize);
  },
  events: {
    tapped: sender => {
      $device.taptic(0);
      switchPlayPauseBtn("pause")
      $("web").eval({
        script: `animItem.stop()`,
        handler: (result, error) => {}
      });
      localAnimateAcitivity();
    }
  }
};
let colorBtn = {
  type: "button",
  props: {
    id: "COLOR",
    image: $file.read("./assets/preview.png").image,
    bgcolor: $color("clear")
  },
  layout: (make, view) => {
    make.centerY.equalTo(view.super.centerY);
    make.left.inset(80);
    make.size.equalTo($size(50, 50));
  },
  events: {
    longPressed: sender =>{
      switchToEditMode()
    },
    tapped: sender => {
      $device.taptic(0);
      foldExpandUniContainer(43)
      if ($("color#FFFFFF") == undefined) {
        let colorList = [
          "#FFFFFF",
          "#000000",
          "#3498DB",
          "#2ECC71",
          "#F1C40F",
          "#C0392B",
          "#8E44AD"
        ];
        let btnHeight = $("universalContainer").frame.height - 8;
        let edge =
          ($("universalContainer").frame.width - btnHeight * colorList.length) /
          (colorList.length + 1);
        for (let i in colorList) {
          $("universalView").add({
            type: "button",
            props: {
              id: "color" + colorList[i],
              radius: 17,
              bgcolor: $color(colorList[i]),
              borderColor: $color("black")
            },
            layout: (make, view) => {
              make.height.width.equalTo(btnHeight);
              make.centerY.equalTo(view.super.centerY);
              make.left.inset(
                (parseInt(i) + 1) * edge + parseInt(i) * btnHeight
              );
            },
            events: {
              tapped: sender => {
                $device.taptic(0);
                $("web").eval({
                  script: `svgContainer.style.backgroundColor="${
                    colorList[i]
                  }"`,
                  handler: (result, error) => {}
                });
                sender.borderWidth = 1.5;
                for (let i in colorList) {
                  if (sender.id != "color" + colorList[i]) {
                    $("color" + colorList[i]).borderWidth = 0;
                  }
                }
              },
            }
          });  
        }
        $("color#FFFFFF").borderWidth = 1.5;
      }
    }
  }
};
let playBtn = {
  type: "button",
  props: {
    id: "PLAY",
    image: $file.read("./assets/play.png").image,
    bgcolor: $color("clear")
  },
  layout: (make, view) => {
    make.center.equalTo(view.super.center);
    make.size.equalTo(btnSize);
  },
  events: {
    tapped: sender => {
      $device.taptic(0);
      sender.remove();
      $("buttonContainer").add(pauseBtn);
      $("slider").value = 0;
      $("web").eval({
        script: `animItem.${sender.id.toLocaleLowerCase()}()`,
        handler: (result, error) => {}
      });
      $ui.toast(sender.id);
    },
    longPressed: sender => {
      $device.taptic(1);
      $("web").eval({
        script: `animItem.stop()`,
        handler: (result, error) => {}
      });
      $ui.toast("STOP");
    }
  }
};
let pauseBtn = {
  type: "button",
  props: {
    id: "PAUSE",
    image: $file.read("./assets/pause.png").image,
    bgcolor: $color("clear")
  },
  layout: (make, view) => {
    make.center.equalTo(view.super.center);
    make.size.equalTo(btnSize);
  },
  events: {
    tapped: sender => {
      $device.taptic(0);
      sender.remove();
      $("buttonContainer").add(playBtn);
      $("web").eval({
        script: `animItem.${sender.id.toLocaleLowerCase()}()`,
        handler: (result, error) => {}
      });
      $ui.toast(sender.id);
    },
    longPressed: sender => {
      $device.taptic(1);
      sender.sender.remove();
      $("buttonContainer").add(playBtn);
      $("web").eval({
        script: `animItem.stop()`,
        handler: (result, error) => {}
      });
      $ui.toast("STOP");
    }
  }
};
let stopBtn = {
  type: "button",
  props: {
    id: "STOP",
    image: $file.read("./assets/stop.png").image,
    bgcolor: $color("clear")
  },
  layout: (make, view) => {
    make.centerY.equalTo(view.super.centerY);
    make.right.inset(80);
    make.size.equalTo(btnSize);
  },
  events: {
    tapped: sender => {
      $device.taptic(0);
      switchPlayPauseBtn("pause")
      $("web").eval({
        script: `animItem.${sender.id.toLocaleLowerCase()}()`,
        handler: (result, error) => {}
      });
      $ui.toast(sender.id);
    }
  }
};
let storeBtn = {
  type: "button",
  props: {
    id: "STORE",
    image: $file.read("./assets/store.png").image,
    bgcolor: $color("clear")
  },
  layout: (make, view) => {
    make.centerY.equalTo(view.super.centerY);
    make.right.inset(15);
    make.size.equalTo(btnSize);
  },
  events: {
    tapped: sender => {
      switchPlayPauseBtn("pause")
      $("web").eval({
        script: `animItem.stop()`,
        handler: (result, error) => {}
      });
      officialPageActivity();
    }
  }
};
let json = $app.env==$env.action?$context.data.string:$file.read("/assets/loading.json").string;
let html = (json, size = normalSize) => `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title></title>
</head>
<style>
    body,
    html {
        overflow: hidden;
        margin: 0;
        padding: 0;
    }

    #svgContainer {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        width: ${size.width}px;
        height: ${size.height}px;
        background-color: #fff;
    }
</style>
</head>
<body>
    <div id="svgContainer"></div>
    <script src="local://scripts/lottie.min.js"></script>
    <script>
        var animationData = ${json}
        var svgContainer = document.getElementById("svgContainer")
        var animItem = bodymovin.loadAnimation({ wrapper: svgContainer, animType: "svg", loop: !0, animationData: animationData })
        setTimeout(() => {
            let duration = animItem.getDuration(true)
            let durationTime=animItem.getDuration(false)
            $notify('getDuration', duration)
            $notify('getDurationTime',durationTime)
        }, 0)
    </script>
</body>

</html>`;
function predictIndicaterPos(){
  framePerSec=duration/durationTime
  let indicaterPos=15
  let indicaterOffsetDis=framePerSec/duration*($("progressContainer").frame.width-30)/100
  console.log(indicaterOffsetDis)
  var timer = $timer.schedule({
    interval: 0.01,
    handler: function() {
      let maxPos=($("progressContainer").frame.width-15)
      indicaterPos=indicaterPos+indicaterOffsetDis
      indicaterPos=indicaterPos<maxPos?indicaterPos:indicaterPos-maxPos+15
      $("progressIndicater").updateLayout((make,view)=>{
        make.left.inset(indicaterPos)
      })
    }
  })
}
function clearUniConatiner(){
  $("universalView").remove()
  $("universalContainer").add({
    type: "view",
    props: {
      id: "universalView",
      bgcolor: $color("clear"),
      radius: 20,
    },
    layout:$layout.fill
  })
}
function foldExpandUniContainer(containerHeight){
  if ($("universalContainer").frame.height == 0&&containerHeight!=0) {
    $("universalContainer").updateLayout(make => {
      make.width.equalTo($("slider").width);
      make.height.equalTo(containerHeight);
    });
    $ui.animate({
      duration: 0.4,
      delay: 0,
      damping: 0.5,
      velocity: 0,
      options: 0,
      animation: () => {
        $("universalContainer").relayout();
        $("universalContainer").alpha = 1;
      },
      completion: function() {
      }
    });
  } else {
    $("universalContainer").updateLayout(make => {
      make.height.width.equalTo(0);
    });
    $ui.animate({
      duration: 0.4,
      delay: 0,
      damping: 0.5,
      velocity: 0,
      options: 0,
      animation: () => {
        $("universalContainer").relayout();
        $("universalContainer").alpha = 0;
      },
      completion: function() {
        clearUniConatiner()
      }
    });
  }
}
function switchPlayPauseBtn(key){
  switch (key) {
    case "auto":{
        if ($("PAUSE") == undefined&&$("PLAY")!=undefined) {
          $("PLAY").remove();
          $("buttonContainer").add(pauseBtn);
        }
       else if($("PLAY") == undefined&&$("PAUSE") != undefined){
          $("PAUSE").remove();
          $("buttonContainer").add(playBtn);
        }
      }break;
    case "play":{
      if ($("PAUSE") == undefined&&$("PLAY")!=undefined) {
        $("PLAY").remove();
        $("buttonContainer").add(pauseBtn);
      }
    }break;
    case "pause":{
      if($("PLAY") == undefined&&$("PAUSE") != undefined){
        $("PAUSE").remove();
        $("buttonContainer").add(playBtn);
      }
    }
    default:
      break;
  }
}

function updateProgressIndicaterBarTime(rate){
  framePerSec=duration/durationTime
  let playTime=(parseInt($("stopProgressPoint").text)-parseInt($("startProgressPoint").text))/framePerSec/rate
  $("progressIndicaterBarTime").text=playTime.toFixed(2).toString()+"s"
}
//编辑模式
function switchToEditMode(){
  $cache.set("editModeFlag", true);
  $cache.set("startProgressFlag",true)
  $cache.set("stopProgressFlag",false)
  $ui.toast("EditMode");
  $("OPEN").updateLayout(make=>{
    make.left.inset(0)
    make.size.equalTo($size(0,0))
  })
  $("COLOR").updateLayout(make=>{
    make.left.inset(0)
    make.size.equalTo($size(0,0))
  })
  $("STOP").updateLayout(make=>{
    make.right.inset(0)
    make.size.equalTo($size(0,0))
  })
  $("STORE").updateLayout(make=>{
    make.right.inset(0)
    make.size.equalTo($size(0,0))
  })

  $ui.animate({
    duration: 1,
    delay: 0,
    damping: 0.5,
    velocity: 0,
    options: 0,
    animation: () => {
      $("OPEN").relayout();
      $("COLOR").relayout();
      $("STOP").relayout();
      $("STORE").relayout();
    }
  });
  $delay(1,()=>{
    $("OPEN").remove()
    $("COLOR").remove()
    $("STOP").remove()
    $("STORE").remove()
    $("EDIT-CLOSE").enabled=true
  })

  $("inputUrl").enabled=false
  $("progressIndicater").remove()
  $("progressIndicaterNum").remove()
  if($("PLAY")!=undefined) $("PLAY").remove() 
  else $("PAUSE").remove()

  clearUniConatiner()
  foldExpandUniContainer(0)
  let listBtn = {
    type: "button",
    props: {
      id: "EDIT-LIST",
      image: $file.read("./assets/list.png").image,
      bgcolor: $color("clear")
    },
    layout: (make, view) => {
      make.centerY.equalTo(view.super.centerY);
      make.left.inset(15);
      make.size.equalTo(btnSize);
    },
    events: {
      tapped: sender => {
        foldExpandUniContainer(100)
      }
    }
  };
  let likeBtn = {
    type: "button",
    props: {
      id: "EDIT-LIKE",
      image: $file.read("./assets/like.png").image,
      bgcolor: $color("clear")
    },
    layout: (make, view) => {
      make.centerY.equalTo(view.super.centerY);
      make.left.inset(80);
      make.size.equalTo(btnSize);
    },
    events: {
      tapped: sender => {
        foldExpandUniContainer(43)
        let label={
          type:"label",
          props:{
            id:"nameInput",
            text:"Name:",
            align:$align.center
          },
          layout:(make,view)=>{
            make.left.inset(15)
            make.centerY.equalTo(view.super.centerY)
          }
        }
        let confirmBtn={
          type:"button",
          props:{
            icon:$icon("064"),
            bgcolor:$color("clear")
          },
          layout:(make,view)=>{
            make.right.inset(15)
            make.centerY.equalTo(view.super.centerY)
          }
        }
        let nameInput={
          type: "input",
          props: {
            id: "NameInput",
            type: $kbType.search,
            placeholder: "Name it",
            darkKeyboard: true,
            borderWidth:0.5
          },
          layout: (make, view) => {
            make.centerY.equalTo(view.super.centerY)
            make.height.equalTo(30);
            make.width.equalTo(140)
            make.left.inset(65)
          },
          events: {
            returned: function(sender) {
              if($("universalContainer").frame.height==0){

              }
              $("NameInput").blur()
            }
          }
        }
        if($("NameInput")==undefined){
          $("universalView").add(nameInput)
          $("universalView").add(label)
          $("universalView").add(confirmBtn)
        }
      }
    }
  };
  let playEditBtn = {
    type: "button",
    props: {
      id: "EDIT-PLAY",
      image: $file.read("./assets/play.png").image,
      bgcolor: $color("clear")
    },
    layout: (make, view) => {
      make.center.equalTo(view.super.center);
      make.size.equalTo(btnSize);
    },
    events: {
      tapped: sender => {
        $device.taptic(0);
        $("web").eval({
          script: `animItem.playSegments([${$("startProgressPoint").text},${$("stopProgressPoint").text}], true);
          animItem.loop = 0;`,
          handler: (result, error) => {}
        });
        $ui.toast("PLAY");
      },
      longPressed: sender => {
        $device.taptic(1);
        $("web").eval({
          script: `animItem.stop()`,
          handler: (result, error) => {}
        });
      }
    }
  };
  let reverseBtn = {
    type: "button",
    props: {
      id: "EDIT-REVERSE",
      image: $file.read("./assets/revert.png").image,
      bgcolor: $color("clear")
    },
    layout: (make, view) => {
      make.centerY.equalTo(view.super.centerY);
      make.right.inset(80);
      make.size.equalTo(btnSize);
    },
    events: {
      tapped: sender => {
        $cache.set("startProgressFlag", true);
        $cache.set("stopProgressFlag", false);
        $ui.toast("CLEAR");
        currentFrame=0
        currentRate=1
        $delay(0.5,()=>{
          $ui.toast("1x");
        })
        $("progressIndicaterBar").updateLayout(make=>{
          make.left.right.inset(0)
        })
        $("startProgressPoint").text="0"
        $("stopProgressPoint").text=duration.toString()
        $("StartProgressIndicater").bgcolor=$color("black");
        $("StopProgressIndicater").bgcolor=$color("gray");
        updateProgressIndicaterBarTime(currentRate)
      }
    }
  };
  let closeBtn = {
    type: "button",
    props: {
      id: "EDIT-CLOSE",
      image: $file.read("./assets/close.png").image,
      bgcolor: $color("clear")
    },
    layout: (make, view) => {
      make.centerY.equalTo(view.super.centerY);
      make.right.inset(15);
      make.size.equalTo(btnSize);
    },
    events: {
      tapped: sender => {
        switchToViewMode()
      }
    }
  };
  $("buttonContainer").add(listBtn)
  $("buttonContainer").add(likeBtn)
  $("buttonContainer").add(playEditBtn)
  $("buttonContainer").add(reverseBtn)
  $("buttonContainer").add(closeBtn)
  $("EDIT-CLOSE").enabled=false
  $delay(1,()=>{

  })
  let startProgressPoint={
    type: "label",
    props: {
      id:"startProgressPoint",
      text: "0",
      align: $align.center,
      font:$font(12),
      textColor:$color("blue"),
    },
    layout: (make, view) => {
      make.centerY.equalTo(view.super.centerY).offset(-14)
      make.centerX.equalTo($("progressIndicaterBar").left)
    }
  }
  let stopProgressPoint={
    type: "label",
    props: {
      id:"stopProgressPoint",
      text: duration.toString(),
      align: $align.center,
      font:$font(12),
      textColor:$color("blue"),
    },
    layout: (make, view) => {
      make.centerY.equalTo(view.super.centerY).offset(-14)
      make.centerX.equalTo($("progressIndicaterBar").right)
    }
  }
  let progressIndicaterBar={
    type: "view",
    props: {
    id:"progressIndicaterBar",
    bgcolor:$color("black"),
    radius:2,
    },
    layout: (make, view) => {
      make.centerY.equalTo(view.super.centerY)
      make.height.equalTo(2)
      make.left.right.inset(0);
    },
  }
  let StartProgressIndicater ={
    type:"view",
    props:{
      id:"StartProgressIndicater",
      bgcolor:$color("black")
    },
    layout:(make,view)=>{
      make.centerX.equalTo($("progressIndicaterBar").left)
      make.centerY.equalTo(view.super.centerY)
      make.width.equalTo(2)
      make.height.equalTo(15)
    },
  }
  let stopProgressIndicater={
    type:"view",
    props:{
      id:"StopProgressIndicater",
      bgcolor:$color("gray")
    },
    layout:(make,view)=>{
      make.centerX.equalTo($("progressIndicaterBar").right)
      make.centerY.equalTo(view.super.centerY)
      make.width.equalTo(2)
      make.height.equalTo(15)
    },
  }
  let progressIndicaterBarTime={
    type: "label",
    props: {
      id:"progressIndicaterBarTime",
      text: durationTime.toFixed(2).toString()+"s",
      align: $align.center,
      font:$font(12),
      textColor:$color("blue"),
    },
    layout: (make, view) => {
      make.centerY.equalTo(view.super.centerY).offset(10)
      make.centerX.equalTo($("progressIndicaterBar").centerX)
    }
  }
  $("progressBar").add(progressIndicaterBar)
  $("progressContainer").add(startProgressPoint)
  $("progressContainer").add(stopProgressPoint)
  $("progressContainer").add(StartProgressIndicater)
  $("progressContainer").add(stopProgressIndicater)
  $("progressContainer").add(progressIndicaterBarTime)
}
//查看模式
function switchToViewMode(){
  $("web").eval({
    script: `animItem.playSegments([0,${$("tailProgressPoint").text}], true);
    animItem.setSpeed(1);
    animItem.loop = !0;
    animItem.play()`,
    handler: (result, error) => {}
  });
  currentFrame=0
  $cache.set("editModeFlag", false);
  $cache.set("startProgressFlag",true)
  $cache.set("stopProgressFlag",false)
  $ui.toast("Viewer Mode");
  $("EDIT-LIST").updateLayout(make=>{
    make.left.inset(0)
    make.size.equalTo($size(0,0))
  })
  $("EDIT-LIKE").updateLayout(make=>{
    make.left.inset(0)
    make.size.equalTo($size(0,0))
  })
  $("EDIT-REVERSE").updateLayout(make=>{
    make.right.inset(0)
    make.size.equalTo($size(0,0))
  })
  $("EDIT-CLOSE").updateLayout(make=>{
    make.right.inset(0)
    make.size.equalTo($size(0,0))
  })

  $ui.animate({
    duration: 1,
    delay: 0,
    damping: 0.5,
    velocity: 0,
    options: 0,
    animation: () => {
      $("EDIT-LIST").relayout();
      $("EDIT-LIKE").relayout();
      $("EDIT-REVERSE").relayout();
      $("EDIT-CLOSE").relayout();
    }
  });
  $delay(1,()=>{
    $("EDIT-LIST").remove();
    $("EDIT-LIKE").remove();
    $("EDIT-PLAY").remove();
    $("EDIT-REVERSE").remove();
    $("EDIT-CLOSE").remove();
    $("COLOR").enabled=true
  })
  clearUniConatiner()
  $("inputUrl").enabled=true
  $("progressIndicaterBar").remove()
  $("startProgressPoint").remove()
  $("stopProgressPoint").remove()
  $("StartProgressIndicater").remove()
  $("StopProgressIndicater").remove()
  $("progressIndicaterBarTime").remove()

  let progressIndicater={
    type:"view",
    props:{
      id:"progressIndicater",
      bgcolor:$color("black")
    },
    layout:(make,view)=>{
      make.left.inset(15)
      make.centerY.equalTo(view.super.centerY)
      make.width.equalTo(2)
      make.height.equalTo(15)
    },
  }
  let progressIndicaterNum={
    type: "label",
    props: {
      id:"progressIndicaterNum",
      text: "0",
      align: $align.center,
      font:$font(12),
      textColor:$color("blue"),
    },
    layout: (make, view) => {
      make.centerY.equalTo(view.super.centerY).offset(-16)
      make.centerX.equalTo($("progressIndicater").centerX)
    }
  }
  $("progressContainer").add(progressIndicater)
  $("progressContainer").add(progressIndicaterNum)
  $("buttonContainer").add(openBtn)
  $("buttonContainer").add(colorBtn)
  $("buttonContainer").add(playBtn)
  $("buttonContainer").add(stopBtn)
  $("buttonContainer").add(storeBtn)
  $("COLOR").enabled=false
}

//下载文件到指定路径
async function downloadFile(url, path, fileName = "") {
  var resp = await $http.download({
    url: url,
    progress: (bytesWritten, totalBytes) => {
      var percentage = (bytesWritten * 1.0) / totalBytes;
      $ui.progress(percentage, "下载中...");
    }
  });
  var file = resp.data;
  if (fileName == "") {
    fileName = file.fileName;
  }
  if (!$file.exists(path)) $file.mkdir(path);
  if ($file.exists(path + fileName)) {
    $ui.toast("同目录已存在同名文件");
  } else {
    $file.write({
      data: file,
      path: path + fileName
    });
    $ui.toast("下载完成 :" + fileName);
    if (/.zip$/.test(fileName)) {
      $ui.toast("检测为压缩包格式，解压中");
      let unZipPath = path + fileName.split(".")[0];
      !$file.exists(unZipPath) ? $file.mkdir(unZipPath) : false;
      $archiver.unzip({
        file: file,
        dest: unZipPath,
        handler: success => {
          $ui.toast("解压完毕");
        }
      });
    }
  }
}
//重置播放状态
function resetPlaySpeed() {
  currentRate = 1;
  currentFrame = 0;
  $device.taptic(1);
  $("slider").value = 0;
  $("web").eval({
    script: `animItem.setSpeed(1)\nanimItem.play()`,
    handler: (result, error) => {}
  });
}
//官方lottie页面跳转
function officialPageActivity(searchText = "") {
  $ui.push({
    props: {
      title: (searchText = "" ? "LottieFile.com" : searchText)
    },
    views: [
      {
        type: "view",
        props: {
          id: "searchbarView"
        },
        layout: (make, view) => {
          make.left.right.inset(0);
          make.top.inset(-45);
          make.height.equalTo(65);
        },
        views: [
          {
            type: "input",
            props: {
              id: "search",
              type: $kbType.search,
              placeholder: "some key words to search",
              darkKeyboard: true
            },
            layout: (make, view) => {
              make.right.top.left.inset(15);
              make.height.equalTo(30);
            },
            events: {
              returned: async sender => {
                $("searchbarView").super.title = sender.text;
                $("webpage").url =
                  "https://www.lottiefiles.com/search?q=" +
                  encodeURI(sender.text);
                $("searchbarView").updateLayout(make => {
                  make.top.inset(-45);
                });
                $ui.animate({
                  duration: 0.4,
                  delay: 0,
                  damping: 0.5,
                  velocity: 0,
                  options: 0,
                  animation: () => {
                    $("hideSearch").title = "expand to search↓";
                    $("searchbarView").relayout();
                  }
                });
                $delay(0.5, $("search").blur());
              }
            }
          },
          {
            type: "button",
            props: {
              id: "hideSearch",
              title: "expand to search↓",
              titleColor: $color("gray"),
              font: $font("Menlo-Bold", 10),
              bgcolor: $color("clear")
            },
            layout: (make, view) => {
              make.left.bottom.right.inset(0);
            },
            events: {
              tapped: sender => {
                if (sender.title == "fold↑") {
                  $("searchbarView").updateLayout(make => {
                    make.top.inset(-45);
                  });
                  $ui.animate({
                    duration: 0.4,
                    delay: 0,
                    damping: 0.5,
                    velocity: 0,
                    options: 0,
                    animation: () => {
                      sender.title = "expand to search↓";
                      $("searchbarView").relayout();
                    }
                  });
                  $delay(0.5, $("search").blur());
                } else {
                  $("searchbarView").updateLayout(make => {
                    make.top.inset(0);
                  });
                  $ui.animate({
                    duration: 0.4,
                    delay: 0,
                    damping: 0.5,
                    velocity: 0,
                    options: 0,
                    animation: () => {
                      sender.title = "fold↑";
                      $("searchbarView").relayout();
                    }
                  });
                  $("search").focus();
                }
              }
            }
          }
        ]
      },
      {
        type: "web",
        props: {
          id: "webpage",
          url:
            searchText == ""
              ? "https://www.lottiefiles.com"
              : `https://www.lottiefiles.com/search?q=${encodeURI(searchText)}`,
          script: `
           if(document.getElementsByClassName("column is-full")[0]!=undefined){
            document.getElementsByClassName("column is-full")[0].parentNode.remove()
           }
          var a=document.getElementsByClassName("button is-light");
            for (i in a ){
              if(a[i].className!="show_qr button is-light"){
                a[i].onclick=function(){
                  $notify("downloadEvent", {"url": this.href})  
                }
              }
            }
          `
        },
        layout: (make, view) => {
          make.left.right.bottom.inset(0);
          make.top.equalTo($("searchbarView").bottom).offset(0);
        },
        events: {
          didStart: (sender, navigation) => {},
          didFinish: (sender, navigation) => {
            $("webpage").eval(`lottie.setQuality("low")`);
          },
          downloadEvent: async object => {
            $ui.toast("开始下载");
            await downloadFile(object.url, "./assets/download/");
          }
        }
      }
    ],
    events: {
      disappeared: () => {},
      dealloc: () => {}
    }
  });
}

//获取本地动画文件
function getJsonIn(parentFolder, jsonList) {
  let list = $file.list(parentFolder);
  for (var i in list) {
    var pointer = parentFolder + "/" + list[i];
    if ($file.isDirectory(pointer)) {
      getJsonIn(pointer, jsonList);
    } else {
      if (
        !/^\./.test(list[i]) &&
        /.json$/.test(list[i]) &&
        !/^config.json$/.test(list[i])
      ) {
        jsonList.push({
          matrixWeb: {
            html: html($file.read(pointer).string, $size(185, 185))
          },
          animationName: {
            text: list[i],
            path: pointer
          }
        });
      } else {
        if (/.zip$/.test(list[i])) {
          let unZipPath = "./assets/download/" + list[i].split(".")[0];
          if (!$file.exists(unZipPath)) {
            $file.mkdir(unZipPath);
            $archiver.unzip({
              file: $file.read(pointer),
              dest: unZipPath,
              handler: success => {
                $ui.toast("解压完毕,重新打开以查看新增内容");
              }
            });
          }
        }
      }
    }
  }
}

function insertData() {
  let jsonList = [];
  getJsonIn(".", jsonList);
  $("selectView").data = jsonList;
}
//本地动画gallery
function localAnimateAcitivity() {
  $ui.push({
    props: {
      title: "Select animate"
    },
    views: [
      {
        type: "matrix",
        props: {
          id: "selectView",
          // data:listData,
          columns: 2,
          itemHeight: 195,
          spacing: 5,
          radius: 10, //圆角,
          template: {
            views: [
              {
                type: "view",
                props: {
                  radius: 10,
                  borderWidth: 1,
                  borderColor: $color("#e8e8e8")
                },
                layout: (make, view) => {
                  make.top.bottom.left.right.equalTo(0);
                  make.height.equalTo(view.super);
                  make.width.equalTo(view.super);
                },
                views: [
                  {
                    type: "web",
                    props: {
                      id: "matrixWeb",
                      scrollEnabled: !1,
                      showsProgress: !1,
                      userInteractionEnabled: false
                    },
                    layout: (make, view) => {
                      make.top.left.right.inset(0);
                      make.height.equalTo(185);
                    },
                    events: {
                      getDuration: frame => {},
                      clickedEvent: str => {}
                    }
                  },
                  {
                    type: "label",
                    props: {
                      id: "animationName",
                      align: $align.center,
                      font: $font(13),
                      lines: 2
                    },
                    layout: (make, view) => {
                      make.left.right.inset(0);
                      make.bottom.inset(5);
                    }
                  }
                ]
              }
            ]
          }
        },
        layout: $layout.fill,
        events: {
          didSelect: (sender, indexPath, data) => {
            json=$file.read(data["animationName"]["path"]).string
            $("web").html = html(json);
            resetPlaySpeed();
            $ui.toast("1x");
            $ui.pop();
          }
        }
      }
    ],
    events: {
      appeared: () => {
        insertData();
      },
      disappeared: () => {},
      dealloc: () => {}
    }
  });
}
$app.autoKeyboardEnabled = true;
$ui.render({
  props: {
    id: "mainView",
    navButtons:[
    $app.env==$env.action?    
      {
        title: "Title",
        icon: "165", // Or you can use icon name
        handler: function() {
          let fileName=$context.data.fileName
          let path="./assets/share/"
          if (!$file.exists(path)) $file.mkdir(path);
          if ($file.exists(path + fileName)) {
            $ui.toast("同目录已存在同名文件");
          } else {
            $file.write({
              data: $context.data,
              path: path + fileName
            });
            $ui.toast("保存完毕: " + fileName);
          }
        }
      }:{
        icon: "022", // Or you can use icon name
        handler: function() {
          $device.taptic(0);
          let data = $data({
            string: json,
            encoding: 4 
          })
          $share.sheet(["data.json", data])
          $ui.toast("SHARE");
        }
      },
    ]
  },
  views: [
    {
      type: "button",
      props: {
        id: "scan",
        icon: $icon("018", $color("gray"), $size(30, 30)),
        bgcolor: $color("clear")
      },
      layout: (make, view) => {
        make.left.top.inset(15);
      },
      events: {
        tapped: async sender => {
          $device.taptic(0);
          let result = await $qrcode.scan();
          let webReg = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*([\?&]\w+=\w*)*$/;
          let lottieReg = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?lottiefiles\.com\/download\/[0-9]*$/;
          let lottieQrReg = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?lottiefiles\.com\/storage\/datafiles\/[-a-zA-Z0-9]*\/[-a-zA-Z0-9]*.json$/;
          if (!!result.match(lottieQrReg)) {
            await downloadFile(
              result,
              "./assets/download/qr/",
              /datafiles\/[-a-zA-Z0-9]*/
                .exec(result)[0]
                .split("/")
                .pop()
                .substring(0, 5) + ".json"
            );
            if (typeof result == "undefined") {
              $ui.toast("canceled");
            } else {
              $("web").html = html($file.read("/assets/loading.json").string);
              let { data } = await $http.get(result);
              json = JSON.stringify(data);
              $("web").html = html(json);
              resetPlaySpeed();
            }
          }
        },
      }
    },
    {
      type: "input",
      props: {
        id: "inputUrl",
        type: $kbType.search,
        darkKeyboard: true,
        placeholder: "Url or KeyWords"
      },
      layout: (make, view) => {
        make.left.inset(60);
        make.top.right.inset(15);
        make.height.equalTo(30);
      },
      events: {
        returned: async sender => {
          let webReg = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*([\?&]\w+=\w*)*$/;
          $delay(0.5, $("inputUrl").blur());
          if (!!sender.text.match(webReg)) {
            $("web").html = html($file.read("/assets/loading.json").string);
            let { data } = await $http.get(sender.text);
            json = JSON.stringify(data);
            $("web").html = html(json);
            resetPlaySpeed();
            $ui.toast("1x");
          } else {
            officialPageActivity(sender.text);
          }
        }
      }
    },
    {
      type: "view",
      props: {
        id: "webContainer"
      },
      layout: (make, view) => {
        make.top.equalTo($("inputUrl").bottom).inset(5);
        make.left.right.inset(4);
        make.bottom.inset(160);
      },
      views: [
        {
          type: "web",
          props: {
            id: "web",
            scrollEnabled: !1,
            showsProgress: !1,
            userInteractionEnabled: false,
            html: html(json)
          },
          layout: (make, view) => {
            make.edges.inset(0);
          },
          events: {
            getDuration: frame => {
              duration = frame - 1;
              $("slider").max = duration;
              $("tailProgressPoint").text=duration;
            },
            getDurationTime:time=>{
              durationTime=time
            },
            clickedEvent: str => {},
            didClose: sender => {}
          }
        }
      ],
      events: {
        touchesBegan: (sender, location) => {
          $cache.set("initLocation", location);
          $cache.set("horizontalEnabled", true);
          $cache.set("verticalEnabled", true);
          $cache.set("checked", false);
          $cache.set("horizontalFixed", false);
          //编辑模式，修复动画被截取的问题
          if ($cache.get("editModeFlag")) {
            $("web").eval({
              script: `animItem.playSegments([0,${$("tailProgressPoint").text}], true);
              animItem.setSpeed(1);
              animItem.loop = 0;
              animItem.pause()`,
              handler: (result, error) => {}
            });
          }
        },
        touchesMoved: (sender, location) => {
          //设定手势操作数据与滑动区域判定
          let loctaion0 = $cache.get("initLocation");
          let deltaX = location["x"] - loctaion0["x"];
          let deltaY = loctaion0["y"] - location["y"];
          let cosa = Math.abs(
            deltaX / Math.sqrt(deltaX * deltaX + deltaY * deltaY)
          );
          let cosb = Math.abs(
            deltaY / Math.sqrt(deltaX * deltaX + deltaY * deltaY)
          );
          if ($cache.get("horizontalEnabled") && cosa > Math.cos(Math.PI / 6)) {
            if (!$cache.get("checked")) {
              $cache.set("checked", true);
              $cache.set("verticalEnabled", false);
            }
            $cache.set("horizontalFixed", true);
          } else if ($cache.get("verticalEnabled") && cosb > Math.cos(Math.PI / 6)) {
            if (!$cache.get("checked")) {
              $cache.set("checked", true);
              $cache.set("horizontalEnabled", false);
            }
          }
          //手势操作-水平动作设置
          if ($cache.get("horizontalEnabled") && $cache.get("checked")) {
            let totalWidth = $("progressBar").frame.width;
            let rate = (deltaX / totalWidth);
            //编辑模式逻辑设置
            if($cache.get("editModeFlag")){
              //编辑开始点
              if($cache.get("startProgressFlag")){
                let frame =
                currentFrame + rate * duration < 0
                  ? 0
                  : currentFrame + rate * duration;
                frame = frame <= parseInt($("stopProgressPoint").text) ? frame : parseInt($("stopProgressPoint").text);
                fixedFrame = frame;
                $("slider").value = frame;
                $ui.toast(frame.toFixed(0) + " frame");
                  $("web").eval({
                    script: `animItem.goToAndStop(${frame.toFixed(0)}, true)`,
                    handler: (result, error) => {}
                  });
                $("progressIndicaterBar").updateLayout(make=>{
                  make.left.inset(frame/duration*$("progressBar").frame.width)
                })
                $("startProgressPoint").text=frame.toFixed(0)
              }
              //编辑结束点
              if($cache.get("stopProgressFlag")){
                let frame =
                currentFrame + rate * duration < parseInt($("startProgressPoint").text)
                  ? parseInt($("startProgressPoint").text)
                  : currentFrame + rate * duration;
                frame = frame <= duration ? frame : duration;
                fixedFrame = frame;
                $("slider").value = frame;
                $ui.toast(frame.toFixed(0) + " frame");
                  $("web").eval({
                    script: `animItem.goToAndStop(${frame.toFixed(0)}, true)`,
                    handler: (result, error) => {}
                  });
                $("progressIndicaterBar").updateLayout(make=>{
                  make.right.inset((duration-frame)/duration*$("progressBar").frame.width)
                })
                $("stopProgressPoint").text=frame.toFixed(0)
              }
              updateProgressIndicaterBarTime(currentRate)
            }else{
              let frame =
                currentFrame + rate * duration < 0
                  ? 0
                  : currentFrame + rate * duration;
              frame = frame <= duration ? frame : duration;
              fixedFrame = frame;
              $("slider").value = frame;
              $ui.toast(frame.toFixed(0) + " frame");
                $("web").eval({
                  script: `animItem.goToAndStop(${frame.toFixed(0)}, true)`,
                  handler: (result, error) => {}
                });
              $("progressIndicater").updateLayout(make=>{
                make.left.inset(15+$("slider").value/$("slider").max*($("progressBar").frame.width)-$("progressIndicater").frame["width"]/2)
              })
              $("progressIndicaterNum").text=frame.toFixed(0)
            }
          }
          //手势操作-竖直动作设置
          if ($cache.get("verticalEnabled") && $cache.get("checked")) {
            let rate =
              currentRate + (deltaY * 2) / $("web").frame.height < 0
                ? 0
                : currentRate + (deltaY * 2) / normalSize.height;
            fixedRate = rate;
            $ui.toast(rate.toFixed(2) + "x");
            $("web").eval({
              script: `animItem.setSpeed(${rate})`,
              handler: (result, error) => {}
            });
            if($cache.get("editModeFlag")){
              updateProgressIndicaterBarTime(fixedRate)
            }
          }
        },
        touchesEnded: (sender, location) => {
          $cache.set("horizontalEnabled", true);
          $cache.set("verticalEnabled", true);
          $cache.set("checked", false);
          currentFrame = fixedFrame;
          currentRate = fixedRate;
          if (!$cache.get("horizontalFixed")) {
            $("web").eval({
              script: `animItem.play()`,
              handler: (result, error) => {}
            });
            $cache.set("horizontalFixed", false);
            switchPlayPauseBtn("play")
          } else {
            switchPlayPauseBtn("pause")
          }
        },
        doubleTapped: sender => {
          $device.taptic(1);
          if($cache.get("editModeFlag")){
            if($cache.get("startProgressFlag")){
              $cache.set("stopProgressFlag", true);
              $cache.set("startProgressFlag", false);
              $("StopProgressIndicater").bgcolor=$color("black");
              $("StartProgressIndicater").bgcolor=$color("gray");
              currentFrame=parseInt($("stopProgressPoint").text)
            }else{
              $cache.set("startProgressFlag", true);
              $cache.set("stopProgressFlag", false);
              $("StartProgressIndicater").bgcolor=$color("black");
              $("StopProgressIndicater").bgcolor=$color("gray");
              currentFrame=parseInt($("startProgressPoint").text)
            }
            $("web").eval({
              script: `animItem.playSegments([${$("startProgressPoint").text},${$("stopProgressPoint").text}], true);
              animItem.setSpeed(1);
              animItem.loop = 0;`,
              handler: (result, error) => {}
            });
            updateProgressIndicaterBarTime(1)
          }else{
            currentRate = 1;
            $ui.toast("1x");
            currentFrame = 0;
            switchPlayPauseBtn("play")
            $("slider").value = 0;
            $("web").eval({
              script: `animItem.setSpeed(1)\nanimItem.play()`,
              handler: (result, error) => {}
            });
          }
        },
        longPressed: sender => {
        },
      }
    },
    {
      type: "stepper",
      props: {
        max: 5.0,
        min: 0.25,
        value: 1,
        step: 0.25
      },
      layout: (make, view) => {
        // make.right.inset(15)
        make.centerX.inset(0);
        make.height.equalTo(12);
        make.bottom.inset(145);
      },
      events: {
        changed: sender => {
          $ui.toast(sender.value + "x");
          $("web").eval({
            script: `animItem.setSpeed(${sender.value})`,
            handler: (result, error) => {}
          });
          if($cache.get("editModeFlag")){
            updateProgressIndicaterBarTime(sender.value)
          } 
        }
      }
    },
    {
      type: "view",
      props: {
        id:"progressContainer",
        radius:2,
      },
      layout: (make, view) => {
        make.bottom.inset(75);
        make.height.equalTo(50)
        make.left.right.inset(15);
      },
      views:[{
        type: "view",
        props: {
          id:"progressBar",
          bgcolor:$color("#B6B6B6"),
          radius:2
        },
        layout: (make, view) => {
          make.centerY.equalTo(view.super.centerY)
          make.height.equalTo(2)
          make.left.right.inset(15);
        },
        views:[]
      },{
        type: "label",
        props: {
          id:"headProgressPoint",
          text: "0",
          align: $align.center,
        },
        layout: (make, view) => {
          make.centerY.equalTo(view.super.centerY).offset(10)
          make.centerX.equalTo($("progressBar").left)
        },
      },
      {
        type: "label",
        props: {
          id:"tailProgressPoint",
          text: "0",
          align: $align.center,
        },
        layout: (make, view) => {
          make.centerY.equalTo(view.super.centerY).offset(10)
          make.centerX.equalTo($("progressBar").right)
        }
      },
      {
        type:"view",
        props:{
          id:"progressIndicater",
          bgcolor:$color("black")
        },
        layout:(make,view)=>{
          make.left.inset(15)
          make.centerY.equalTo(view.super.centerY)
          make.width.equalTo(2)
          make.height.equalTo(15)
        },
      },
      {
        type: "label",
        props: {
          id:"progressIndicaterNum",
          text: "0",
          align: $align.center,
          font:$font(12),
          textColor:$color("blue"),
        },
        layout: (make, view) => {
          make.centerY.equalTo(view.super.centerY).offset(-14)
          make.centerX.equalTo($("progressIndicater").centerX)
        }
      },],
      events: {
        touchesBegan: (sender, location) => {
          let hotAreaEdge=20
          if($cache.get("editModeFlag")){
            let startCenterX=$("StartProgressIndicater").frame["x"]+$("StartProgressIndicater").frame["width"]/2
            let startCenterY=$("StartProgressIndicater").frame["y"]+$("StartProgressIndicater").frame["height"]/2
            let stopCenterX=$("StopProgressIndicater").frame["x"]+$("StopProgressIndicater").frame["width"]/2
            let stopCenterY=$("StopProgressIndicater").frame["y"]+$("StopProgressIndicater").frame["height"]/2
            let disStart=Math.sqrt((location["x"]-startCenterX)*(location["x"]-startCenterX)+(location["y"]-startCenterY)*(location["y"]-startCenterY))
            let disStop=Math.sqrt((location["x"]-stopCenterX)*(location["x"]-stopCenterX)+(location["y"]-stopCenterY)*(location["y"]-stopCenterY))
            //处理开始点和结束点的操作逻辑
            if(!(disStart<=hotAreaEdge&&disStop<=hotAreaEdge)){
              
              if(disStart<=hotAreaEdge){
                //激活开始点操作
                $device.taptic(0);
                $cache.set("actived", true);
                $cache.set("startProgressFlag", true);
                $cache.set("stopProgressFlag", false);
                $ui.toast("edit start point");
                currentFrame=parseInt($("startProgressPoint").text)
                $("StartProgressIndicater").bgcolor=$color("black")
                $("StopProgressIndicater").bgcolor=$color("gray")
              }else if(disStop<=hotAreaEdge){
                //激活结束点操作
                $device.taptic(0);
                $cache.set("actived", true);
                $cache.set("stopProgressFlag", true);
                $cache.set("startProgressFlag", false);
                $ui.toast("edit stop point");
                currentFrame=parseInt($("stopProgressPoint").text)
                $("StopProgressIndicater").bgcolor=$color("black")
                $("StartProgressIndicater").bgcolor=$color("gray")
              }
            }else{
              //两设定点区域重叠时的操作
              if($("StartProgressIndicater").bgcolor==$color("black")){
                $device.taptic(0);
                $cache.set("actived", true);
                $cache.set("startProgressFlag", true);
                $cache.set("stopProgressFlag", false);
              }else{
                $device.taptic(0);
                $cache.set("actived", true);
                $cache.set("stopProgressFlag", true);
                $cache.set("startProgressFlag", false);
              }
            }
          }else{
            let centerX=$("progressIndicater").frame["x"]+$("progressIndicater").frame["width"]/2
            let centerY=$("progressIndicater").frame["y"]+$("progressIndicater").frame["height"]/2
            let dis=Math.sqrt((location["x"]-centerX)*(location["x"]-centerX)+(location["y"]-centerY)*(location["y"]-centerY))
            if(dis<=hotAreaEdge){
              $device.taptic(0);
              $cache.set("actived", true);
              }
            }
          $cache.set("initLocation", location);
          $cache.set("verticalEnabled", true);
          $cache.set("checked", false);
          $cache.set("horizontalFixed", false);
          //编辑模式，修复动画被截取的问题
          if ($cache.get("editModeFlag")) {
            $("web").eval({
              script: `animItem.playSegments([0,${$("tailProgressPoint").text}], true);
              animItem.setSpeed(1);
              animItem.loop = 0;
              animItem.pause()`,
              handler: (result, error) => {}
            });
          }
        },
        touchesMoved: (sender, location) => {
          if($cache.get("actived")){
              //设定手势操作数据与滑动区域判定
            let loctaion0 = $cache.get("initLocation");
            let deltaX = location["x"] - loctaion0["x"];
            let deltaY = loctaion0["y"] - location["y"];
            let cosa = Math.abs(
              deltaX / Math.sqrt(deltaX * deltaX + deltaY * deltaY)
            );
            if ($cache.get("horizontalEnabled") && cosa > Math.cos(Math.PI / 6)) {

              //手势操作-方向锁定相关
              if (!$cache.get("checked")) {
                $cache.set("checked", true);
              }
              $cache.set("horizontalFixed", true);
            }
            //手势操作-水平动作设置
            if ($cache.get("horizontalEnabled") && $cache.get("checked")) {
              let totalWidth = $("progressBar").frame.width;
              let rate = (deltaX / totalWidth);
              //编辑模式逻辑设置
              if($cache.get("editModeFlag")){
                //编辑开始点
                if($cache.get("startProgressFlag")){
                  let frame =
                  currentFrame + rate * duration < 0
                    ? 0
                    : currentFrame + rate * duration;
                  frame = frame <= parseInt($("stopProgressPoint").text) ? frame : parseInt($("stopProgressPoint").text);
                  fixedFrame = frame;
                  $("slider").value = frame;
                  $ui.toast(frame.toFixed(0) + " frame");
                    $("web").eval({
                      script: `animItem.goToAndStop(${frame.toFixed(0)}, true)`,
                      handler: (result, error) => {}
                    });
                  $("progressIndicaterBar").updateLayout(make=>{
                    make.left.inset(frame/duration*$("progressBar").frame.width)
                  })
                  $("startProgressPoint").text=frame.toFixed(0)
                }
                //编辑结束点
                if($cache.get("stopProgressFlag")){
                  let frame =
                  currentFrame + rate * duration < parseInt($("startProgressPoint").text)
                    ? parseInt($("startProgressPoint").text)
                    : currentFrame + rate * duration;
                  frame = frame <= duration ? frame : duration;
                  fixedFrame = frame;
                  $("slider").value = frame;
                  $ui.toast(frame.toFixed(0) + " frame");
                    $("web").eval({
                      script: `animItem.goToAndStop(${frame.toFixed(0)}, true)`,
                      handler: (result, error) => {}
                    });
                  $("progressIndicaterBar").updateLayout(make=>{
                    make.right.inset((duration-frame)/duration*$("progressBar").frame.width)
                  })
                  $("stopProgressPoint").text=frame.toFixed(0)
                }
                updateProgressIndicaterBarTime(currentRate)
              }else{
                let frame =
                  currentFrame + rate * duration < 0
                    ? 0
                    : currentFrame + rate * duration;
                frame = frame <= duration ? frame : duration;
                fixedFrame = frame;
                $("slider").value = frame;
                $ui.toast(frame.toFixed(0) + " frame");
                  $("web").eval({
                    script: `animItem.goToAndStop(${frame.toFixed(0)}, true)`,
                    handler: (result, error) => {}
                  });
                $("progressIndicater").updateLayout(make=>{
                  make.left.inset(15+$("slider").value/$("slider").max*($("progressBar").frame.width)-$("progressIndicater").frame["width"]/2)
                })
                $("progressIndicaterNum").text=frame.toFixed(0)
              }
            }
          }
        },
        touchesEnded: (sender, location) => {
          if($cache.get("actived")){
            $cache.set("actived", false);
            $cache.set("horizontalEnabled", true);
            $cache.set("checked", false);
            currentFrame = fixedFrame;
            currentRate = fixedRate;
            $device.taptic(1);
            if($cache.get("editModeFlag")){
              
              $delay(0.1,()=>{
                $("web").eval({
                  script: `animItem.playSegments([${$("startProgressPoint").text},${$("stopProgressPoint").text}], true);
                  animItem.setSpeed(1);
                  animItem.loop = 0;`,
                  handler: (result, error) => {}
                });
              })
            }else{
              switchPlayPauseBtn("pause")
            }
          }
        },
      }
    },
    {
      type: "slider",
      props: {
        value: 0,
        max: 1.0,
        min: 0,
      },
      layout: (make, view) => {
        make.bottom.inset(-40);
        make.left.right.inset(15);
      },
      events: {
        changed: sender => {
          $ui.toast(~~sender.value + " frame");
          $("web").eval({
            script: `animItem.goToAndStop(${~~sender.value}, true)`,
            handler: (result, error) => {}
          });
        }
      }
    },
    {
      type: "view",
      props: {
        id: "buttonContainer",
        borderColor: $color("black"),
        borderWidth: 1,
        radius: 20,
        bgcolor: $color("#EEF1F1")
      },
      layout: (make, view) => {
        make.height.equalTo(60);
        make.left.right.inset(15);
        make.bottom.inset(20);
      },
      views: [openBtn, colorBtn, pauseBtn, stopBtn, storeBtn]
    },
    universalContainer
  ],
  events: {
    tapped: sender => {
      $("inputUrl").blur();
      if($("NameInput")!=undefined){
        $("NameInput").blur()
      }
      if (
        $("universalContainer") != undefined &&
        $("universalContainer").frame.height != 0
      ) {
        $device.taptic(0);
        $("universalContainer").updateLayout(make => {
          make.width.height.equalTo(0);
        });
        $ui.animate({
          duration: 0.4,
          delay: 0,
          damping: 0.5,
          velocity: 0,
          options: 0,
          animation: () => {
            $("universalContainer").relayout();
            $("universalContainer").alpha = 0;
          }
        });
      }
    },
    appeared: () => {
    },
    disappeared: () => {},
    dealloc: () => {}
  }
});
