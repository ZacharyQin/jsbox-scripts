$app.rotateDisabled = true
$ui.toast("点击播放，长按复制")
var audioTable = [
    {
      "SystemSoundID": "1000",
      "File name": "new-mail.caf",
      "Category": "MailReceived"
    },
    {
      "SystemSoundID": "1001",
      "File name": "mail-sent.caf",
      "Category": "MailSent"
    },
    {
      "SystemSoundID": "1002",
      "File name": "Voicemail.caf",
      "Category": "VoicemailReceived"
    },
    {
      "SystemSoundID": "1003",
      "File name": "ReceivedMessage.caf",
      "Category": "SMSReceived"
    },
    {
      "SystemSoundID": "1004",
      "File name": "SentMessage.caf",
      "Category": "SMSSent"
    },
    {
      "SystemSoundID": "1005",
      "File name": "alarm.caf",
      "Category": "CalendarAlert"
    },
    {
      "SystemSoundID": "1006",
      "File name": "low_power.caf",
      "Category": "LowPower"
    },
    {
      "SystemSoundID": "1007",
      "File name": "sms-received1.caf",
      "Category": "SMSReceived_Alert"
    },
    {
      "SystemSoundID": "1008",
      "File name": "sms-received2.caf",
      "Category": "SMSReceived_Alert"
    },
    {
      "SystemSoundID": "1009",
      "File name": "sms-received3.caf",
      "Category": "SMSReceived_Alert"
    },
    {
      "SystemSoundID": "1010",
      "File name": "sms-received4.caf",
      "Category": "SMSReceived_Alert"
    },
    {
      "SystemSoundID": "1011",
      "File name": "-",
      "Category": "SMSReceived_Vibrate"
    },
    {
      "SystemSoundID": "1012",
      "File name": "sms-received1.caf",
      "Category": "SMSReceived_Alert"
    },
    {
      "SystemSoundID": "1013",
      "File name": "sms-received5.caf",
      "Category": "SMSReceived_Alert"
    },
    {
      "SystemSoundID": "1014",
      "File name": "sms-received6.caf",
      "Category": "SMSReceived_Alert"
    },
    { "SystemSoundID": "1015", "File name": "Voicemail.caf", "Category": "-" },
    {
      "SystemSoundID": "1016",
      "File name": "tweet_sent.caf",
      "Category": "SMSSent"
    },
    {
      "SystemSoundID": "1020",
      "File name": "Anticipate.caf",
      "Category": "SMSReceived_Alert"
    },
    {
      "SystemSoundID": "1021",
      "File name": "Bloom.caf",
      "Category": "SMSReceived_Alert"
    },
    {
      "SystemSoundID": "1022",
      "File name": "Calypso.caf",
      "Category": "SMSReceived_Alert"
    },
    {
      "SystemSoundID": "1023",
      "File name": "Choo_Choo.caf",
      "Category": "SMSReceived_Alert"
    },
    {
      "SystemSoundID": "1024",
      "File name": "Descent.caf",
      "Category": "SMSReceived_Alert"
    },
    {
      "SystemSoundID": "1025",
      "File name": "Fanfare.caf",
      "Category": "SMSReceived_Alert"
    },
    {
      "SystemSoundID": "1026",
      "File name": "Ladder.caf",
      "Category": "SMSReceived_Alert"
    },
    {
      "SystemSoundID": "1027",
      "File name": "Minuet.caf",
      "Category": "SMSReceived_Alert"
    },
    {
      "SystemSoundID": "1028",
      "File name": "News_Flash.caf",
      "Category": "SMSReceived_Alert"
    },
    {
      "SystemSoundID": "1029",
      "File name": "Noir.caf",
      "Category": "SMSReceived_Alert"
    },
    {
      "SystemSoundID": "1030",
      "File name": "Sherwood_Forest.caf",
      "Category": "SMSReceived_Alert"
    },
    {
      "SystemSoundID": "1031",
      "File name": "Spell.caf",
      "Category": "SMSReceived_Alert"
    },
    {
      "SystemSoundID": "1032",
      "File name": "Suspense.caf",
      "Category": "SMSReceived_Alert"
    },
    {
      "SystemSoundID": "1033",
      "File name": "Telegraph.caf",
      "Category": "SMSReceived_Alert"
    },
    {
      "SystemSoundID": "1034",
      "File name": "Tiptoes.caf",
      "Category": "SMSReceived_Alert"
    },
    {
      "SystemSoundID": "1035",
      "File name": "Typewriters.caf",
      "Category": "SMSReceived_Alert"
    },
    {
      "SystemSoundID": "1036",
      "File name": "Update.caf",
      "Category": "SMSReceived_Alert"
    },
    { "SystemSoundID": "1050", "File name": "ussd.caf", "Category": "USSDAlert" },
    {
      "SystemSoundID": "1051",
      "File name": "SIMToolkitCallDropped.caf",
      "Category": "SIMToolkitTone"
    },
    {
      "SystemSoundID": "1052",
      "File name": "SIMToolkitGeneralBeep.caf",
      "Category": "SIMToolkitTone"
    },
    {
      "SystemSoundID": "1053",
      "File name": "SIMToolkitNegativeACK.caf",
      "Category": "SIMToolkitTone"
    },
    {
      "SystemSoundID": "1054",
      "File name": "SIMToolkitPositiveACK.caf",
      "Category": "SIMToolkitTone"
    },
    {
      "SystemSoundID": "1055",
      "File name": "SIMToolkitSMS.caf",
      "Category": "SIMToolkitTone"
    },
    {
      "SystemSoundID": "1057",
      "File name": "Tink.caf",
      "Category": "PINKeyPressed"
    },
    {
      "SystemSoundID": "1070",
      "File name": "ct-busy.caf",
      "Category": "AudioToneBusy"
    },
    {
      "SystemSoundID": "1071",
      "File name": "ct-congestion.caf",
      "Category": "AudioToneCongestion"
    },
    {
      "SystemSoundID": "1072",
      "File name": "ct-path-ack.caf",
      "Category": "AudioTonePathAcknowledge"
    },
    {
      "SystemSoundID": "1073",
      "File name": "ct-error.caf",
      "Category": "AudioToneError"
    },
    {
      "SystemSoundID": "1074",
      "File name": "ct-call-waiting.caf",
      "Category": "AudioToneCallWaiting"
    },
    {
      "SystemSoundID": "1075",
      "File name": "ct-keytone2.caf",
      "Category": "AudioToneKey2"
    },
    {
      "SystemSoundID": "1100",
      "File name": "lock.caf",
      "Category": "ScreenLocked"
    },
    {
      "SystemSoundID": "1101",
      "File name": "unlock.caf",
      "Category": "ScreenUnlocked"
    },
    { "SystemSoundID": "1102", "File name": "-", "Category": "FailedUnlock" },
    {
      "SystemSoundID": "1103",
      "File name": "Tink.caf",
      "Category": "KeyPressed"
    },
    {
      "SystemSoundID": "1104",
      "File name": "Tock.caf",
      "Category": "KeyPressed"
    },
    {
      "SystemSoundID": "1105",
      "File name": "Tock.caf",
      "Category": "KeyPressed"
    },
    {
      "SystemSoundID": "1106",
      "File name": "beep-beep.caf",
      "Category": "ConnectedToPower"
    },
    {
      "SystemSoundID": "1107",
      "File name": "RingerChanged.caf",
      "Category": "RingerSwitchIndication"
    },
    {
      "SystemSoundID": "1108",
      "File name": "photoShutter.caf",
      "Category": "CameraShutter"
    },
    {
      "SystemSoundID": "1109",
      "File name": "shake.caf",
      "Category": "ShakeToShuffle"
    },
    {
      "SystemSoundID": "1110",
      "File name": "jbl_begin.caf",
      "Category": "JBL_Begin"
    },
    {
      "SystemSoundID": "1111",
      "File name": "jbl_confirm.caf",
      "Category": "JBL_Confirm"
    },
    {
      "SystemSoundID": "1112",
      "File name": "jbl_cancel.caf",
      "Category": "JBL_Cancel"
    },
    {
      "SystemSoundID": "1113",
      "File name": "begin_record.caf",
      "Category": "BeginRecording"
    },
    {
      "SystemSoundID": "1114",
      "File name": "end_record.caf",
      "Category": "EndRecording"
    },
    {
      "SystemSoundID": "1115",
      "File name": "jbl_ambiguous.caf",
      "Category": "JBL_Ambiguous"
    },
    {
      "SystemSoundID": "1116",
      "File name": "jbl_no_match.caf",
      "Category": "JBL_NoMatch"
    },
    {
      "SystemSoundID": "1117",
      "File name": "begin_video_record.caf",
      "Category": "BeginVideoRecording"
    },
    {
      "SystemSoundID": "1118",
      "File name": "end_video_record.caf",
      "Category": "EndVideoRecording"
    },
    {
      "SystemSoundID": "1150",
      "File name": "vc~invitation-accepted.caf",
      "Category": "VCInvitationAccepted"
    },
    {
      "SystemSoundID": "1151",
      "File name": "vc~ringing.caf",
      "Category": "VCRinging"
    },
    {
      "SystemSoundID": "1152",
      "File name": "vc~ended.caf",
      "Category": "VCEnded"
    },
    {
      "SystemSoundID": "1153",
      "File name": "ct-call-waiting.caf",
      "Category": "VCCallWaiting"
    },
    {
      "SystemSoundID": "1154",
      "File name": "vc~ringing.caf",
      "Category": "VCCallUpgrade"
    },
    {
      "SystemSoundID": "1200",
      "File name": "dtmf-0.caf",
      "Category": "TouchTone"
    },
    {
      "SystemSoundID": "1201",
      "File name": "dtmf-1.caf",
      "Category": "TouchTone"
    },
    {
      "SystemSoundID": "1202",
      "File name": "dtmf-2.caf",
      "Category": "TouchTone"
    },
    {
      "SystemSoundID": "1203",
      "File name": "dtmf-3.caf",
      "Category": "TouchTone"
    },
    {
      "SystemSoundID": "1204",
      "File name": "dtmf-4.caf",
      "Category": "TouchTone"
    },
    {
      "SystemSoundID": "1205",
      "File name": "dtmf-5.caf",
      "Category": "TouchTone"
    },
    {
      "SystemSoundID": "1206",
      "File name": "dtmf-6.caf",
      "Category": "TouchTone"
    },
    {
      "SystemSoundID": "1207",
      "File name": "dtmf-7.caf",
      "Category": "TouchTone"
    },
    {
      "SystemSoundID": "1208",
      "File name": "dtmf-8.caf",
      "Category": "TouchTone"
    },
    {
      "SystemSoundID": "1209",
      "File name": "dtmf-9.caf",
      "Category": "TouchTone"
    },
    {
      "SystemSoundID": "1210",
      "File name": "dtmf-star.caf",
      "Category": "TouchTone"
    },
    {
      "SystemSoundID": "1211",
      "File name": "dtmf-pound.caf",
      "Category": "TouchTone"
    },
    {
      "SystemSoundID": "1254",
      "File name": "long_low_short_high.caf",
      "Category": "Headset_StartCall"
    },
    {
      "SystemSoundID": "1255",
      "File name": "short_double_high.caf",
      "Category": "Headset_Redial"
    },
    {
      "SystemSoundID": "1256",
      "File name": "short_low_high.caf",
      "Category": "Headset_AnswerCall"
    },
    {
      "SystemSoundID": "1257",
      "File name": "short_double_low.caf",
      "Category": "Headset_EndCall"
    },
    {
      "SystemSoundID": "1258",
      "File name": "short_double_low.caf",
      "Category": "Headset_CallWaitingActions"
    },
    {
      "SystemSoundID": "1259",
      "File name": "middle_9_short_double_low.caf",
      "Category": "Headset_TransitionEnd"
    },
    {
      "SystemSoundID": "1300",
      "File name": "Voicemail.caf",
      "Category": "SystemSoundPreview"
    },
    {
      "SystemSoundID": "1301",
      "File name": "ReceivedMessage.caf",
      "Category": "SystemSoundPreview"
    },
    {
      "SystemSoundID": "1302",
      "File name": "new-mail.caf",
      "Category": "SystemSoundPreview"
    },
    {
      "SystemSoundID": "1303",
      "File name": "mail-sent.caf",
      "Category": "SystemSoundPreview"
    },
    {
      "SystemSoundID": "1304",
      "File name": "alarm.caf",
      "Category": "SystemSoundPreview"
    },
    {
      "SystemSoundID": "1305",
      "File name": "lock.caf",
      "Category": "SystemSoundPreview"
    },
    {
      "SystemSoundID": "1306",
      "File name": "Tock.caf",
      "Category": "KeyPressClickPreview"
    },
    {
      "SystemSoundID": "1307",
      "File name": "sms-received1.caf",
      "Category": "SMSReceived_Selection"
    },
    {
      "SystemSoundID": "1308",
      "File name": "sms-received2.caf",
      "Category": "SMSReceived_Selection"
    },
    {
      "SystemSoundID": "1309",
      "File name": "sms-received3.caf",
      "Category": "SMSReceived_Selection"
    },
    {
      "SystemSoundID": "1310",
      "File name": "sms-received4.caf",
      "Category": "SMSReceived_Selection"
    },
    {
      "SystemSoundID": "1311",
      "File name": "-",
      "Category": "SMSReceived_Vibrate"
    },
    {
      "SystemSoundID": "1312",
      "File name": "sms-received1.caf",
      "Category": "SMSReceived_Selection"
    },
    {
      "SystemSoundID": "1313",
      "File name": "sms-received5.caf",
      "Category": "SMSReceived_Selection"
    },
    {
      "SystemSoundID": "1314",
      "File name": "sms-received6.caf",
      "Category": "SMSReceived_Selection"
    },
    {
      "SystemSoundID": "1315",
      "File name": "Voicemail.caf",
      "Category": "SystemSoundPreview"
    },
    {
      "SystemSoundID": "1320",
      "File name": "Anticipate.caf",
      "Category": "SMSReceived_Selection"
    },
    {
      "SystemSoundID": "1321",
      "File name": "Bloom.caf",
      "Category": "SMSReceived_Selection"
    },
    {
      "SystemSoundID": "1322",
      "File name": "Calypso.caf",
      "Category": "SMSReceived_Selection"
    },
    {
      "SystemSoundID": "1323",
      "File name": "Choo_Choo.caf",
      "Category": "SMSReceived_Selection"
    },
    {
      "SystemSoundID": "1324",
      "File name": "Descent.caf",
      "Category": "SMSReceived_Selection"
    },
    {
      "SystemSoundID": "1325",
      "File name": "Fanfare.caf",
      "Category": "SMSReceived_Selection"
    },
    {
      "SystemSoundID": "1326",
      "File name": "Ladder.caf",
      "Category": "SMSReceived_Selection"
    },
    {
      "SystemSoundID": "1327",
      "File name": "Minuet.caf",
      "Category": "SMSReceived_Selection"
    },
    {
      "SystemSoundID": "1328",
      "File name": "News_Flash.caf",
      "Category": "SMSReceived_Selection"
    },
    {
      "SystemSoundID": "1329",
      "File name": "Noir.caf",
      "Category": "SMSReceived_Selection"
    },
    {
      "SystemSoundID": "1330",
      "File name": "Sherwood_Forest.caf",
      "Category": "SMSReceived_Selection"
    },
    {
      "SystemSoundID": "1331",
      "File name": "Spell.caf",
      "Category": "SMSReceived_Selection"
    },
    {
      "SystemSoundID": "1332",
      "File name": "Suspense.caf",
      "Category": "SMSReceived_Selection"
    },
    {
      "SystemSoundID": "1333",
      "File name": "Telegraph.caf",
      "Category": "SMSReceived_Selection"
    },
    {
      "SystemSoundID": "1334",
      "File name": "Tiptoes.caf",
      "Category": "SMSReceived_Selection"
    },
    {
      "SystemSoundID": "1335",
      "File name": "Typewriters.caf",
      "Category": "SMSReceived_Selection"
    },
    {
      "SystemSoundID": "1336",
      "File name": "Update.caf",
      "Category": "SMSReceived_Selection"
    },
    {
      "SystemSoundID": "1350",
      "File name": "-",
      "Category": "RingerVibeChanged"
    },
    {
      "SystemSoundID": "1351",
      "File name": "-",
      "Category": "SilentVibeChanged"
    },
    { "SystemSoundID": "4095", "File name": "-", "Category": "Vibrate" }
  ];
  
  $ui.render({
    props: {
      title: "Built-in Audio&Vibrate"
    },
    views: [
      {
        type: "scroll",
        props: {
          bgcolor: $color("#F2F2F2"),
          id: "scrollView"
        },
        layout: $layout.fill
      }
    ]
  });
  var y = -60;
  for (var i = 0; i < audioTable.length; i++) {
    y += 70;
    $("scrollView").add({
      type: "view",
      props: {
        id: i,
        bgcolor: $color("white"),
        smoothRadius: 10
      },
      events: {
        tapped: function(sender) {
          let index = sender.id;
          $audio.play({ id: audioTable[index]["SystemSoundID"] });
          $("icon" + index)
            .animator.makeOpacity(0.2)
            .thenAfter(0.5)
            .makeOpacity(1)
            .spring.animate(0.6);
        },
        longPressed: function(sender) {
          let index = sender.sender.id;
          $device.taptic(1);
          $ui.alert({
            title: '"' + audioTable[index]["File name"] + '"',
            message: "需要复制么？",
            actions: [
              {
                title: '"' + audioTable[index]["SystemSoundID"] + '"',
                handler: function() {
                  $clipboard.text = audioTable[index]["SystemSoundID"];
                  $ui.toast("Copied!");
                }
              },
              {
                title: '"' + audioTable[index]["File name"] + '"',
                handler: function() {
                  $clipboard.text = audioTable[index]["File name"];
                  $ui.toast("Copied!");
                }
              },
              {
                title:
                  '" $audio.play({id:' +
                  audioTable[index]["SystemSoundID"] +
                  '});"',
                handler: function() {
                  $clipboard.text =
                    "$audio.play({id:" + audioTable[index]["SystemSoundID"] + "});";
                  $ui.toast("Copied!");
                }
              },
              {
                title: "取消",
                handler: function() {}
              }
            ]
          });
        }
      },
      layout: function(make, view) {
        make.centerX.equalTo(view.super.center);
        make.height.equalTo(60);
        make.top.inset(y);
        make.width.equalTo(0.95*$device.info["screen"]["width"]);
      },
      views: [
        {
          type: "image",
          props: {
            id: "icon" + i,
            icon: $icon("012", $color("black"))
          },
          layout: function(make, view) {
            make.centerY.equalTo(view.super.center);
            make.left.inset(20);
          }
        },
        {
          type: "label",
          props: {
            text:
              audioTable[i]["Category"] +
              "\n[" +
              audioTable[i]["File name"] +
              "]",
            lines: 2,
            textColor: $color("black"),
            align: $align.center
          },
          layout: function(make, view) {
            make.center.equalTo(view.super.center);
          }
        }
      ]
    });
  }
  
  $("scrollView").resize();
  