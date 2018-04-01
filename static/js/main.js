/**
 * Created by kokdemo on 16/3/18.
 */
var ajaxManager = (function() {
    var requests = [];

    return {
        addReq:  function(opt) {
            requests.push(opt);
        },
        removeReq:  function(opt) {
            if( $.inArray(opt, requests) > -1 )
                requests.splice($.inArray(opt, requests), 1);
        },
        run: function() {
            var self = this,
                oriSuc;

            if( requests.length ) {
                oriSuc = requests[0].complete;

                requests[0].complete = function() {
                    if( typeof(oriSuc) === 'function' ) oriSuc();
                    requests.shift();
                    self.run.apply(self, []);
                };

                $.ajax(requests[0]);
            } else {
                self.tid = setTimeout(function() {
                    self.run.apply(self, []);
                }, 1000);
            }
        },
        stop:  function() {
            requests = [];
            clearTimeout(this.tid);
        }
    };
}());
function computeSunRiseSunSet(Latitude, Longitude, TimeZone) {
    var curTime = new Date();
    // Variable names used: B5, C, C2, C3, CD, D, DR, H, HR, HS, L0, L5, M, MR, MS, N, PI, R1, RD, S1, SC, SD, str
    var retVal = new Object();
    var PI = Math.PI;
    var DR = PI / 180;
    var RD = 1 / DR;
    var B5 = Latitude;
    var L5 = Longitude;
    var H = -1 * (curTime.getTimezoneOffset() / 60 * -1); // Local timezone
    // Overriding TimeZone to standardize on UTC
    // H = 0;
    var M = curTime.getMonth() + 1;
    var D = curTime.getDate();
    B5 = DR * B5;
    var N = parseInt(275 * M / 9) - 2 * parseInt((M + 9) / 12) + D - 30;
    var L0 = 4.8771 + .0172 * (N + .5 - L5 / 360);
    var C = .03342 * Math.sin(L0 + 1.345);
    var C2 = RD * (Math.atan(Math.tan(L0 + C)) - Math.atan(.9175 * Math.tan(L0 + C)) - C);
    var SD = .3978 * Math.sin(L0 + C);
    var CD = Math.sqrt(1 - SD * SD);
    var SC = (SD * Math.sin(B5) + .0145) / (Math.cos(B5) * CD);
    if (Math.abs(SC) <= 1) {
        var C3 = RD * Math.atan(SC / Math.sqrt(1 - SC * SC));
        var R1 = 6 - H - (L5 + C2 + C3) / 15;
        var HR = parseInt(R1);
        var MR = parseInt((R1 - HR) * 60);
        retVal.SunRise = parseTime(HR + ":" + MR);
        retVal.sr = HR * 3600 + MR * 60;
        var TargetTimezoneOffset = (TimeZone * 60 * 60 * 1000) + (retVal.SunRise.getTimezoneOffset() * 60 * 1000);
        var transformedSunRise = new Date(retVal.SunRise.getTime() + TargetTimezoneOffset);
        var strSunRise = "日出" + transformedSunRise.getHours() + ":" + (transformedSunRise.getMinutes() < 10 ? "0" + transformedSunRise.getMinutes() : transformedSunRise.getMinutes());
        var S1 = 18 - H - (L5 + C2 - C3) / 15;
        var HS = parseInt(S1);
        var MS = parseInt((S1 - HS) * 60);
        retVal.SunSet = parseTime(HS + ":" + MS);
        retVal.ss = HS * 3600 + MS * 60;
        var transformedSunSet = new Date(retVal.SunSet.getTime() + TargetTimezoneOffset);
        var strSunSet = "日落" + transformedSunSet.getHours() + ":" + (transformedSunSet.getMinutes() < 10 ? "0" + transformedSunSet.getMinutes() : transformedSunSet.getMinutes());
        retVal.Noon = new Date((retVal.SunRise.getTime() + retVal.SunSet.getTime()) / 2);
        var transformedNoon = new Date(retVal.Noon.getTime() + TargetTimezoneOffset);
        var strNoon = "正午" + transformedNoon.getHours() + ":" + (transformedNoon.getMinutes() < 10 ? "0" + transformedNoon.getMinutes() : transformedNoon.getMinutes());
    }
    else {
        if (SC > 1) {
            // str="Sun up all day";
            strSunRise = ".";
            strNoon = ".";
            strSunSet = ".";
            var tDate = new Date();
            // Set Sunset to be in the future ...
            retVal.SunSet = new Date(tDate.getFullYear() + 1, tDate.getMonth(), tDate.getDay(), tDate.getHours());
            // Set Sunrise to be in the past ...
            retVal.SunRise = new Date(tDate.getFullYear() - 1, tDate.getMonth(), tDate.getDay(), tDate.getHours() - 1);
        }
        if (SC < -1) {
            // str="Sun down all day";
            strSunRise = ".";
            strNoon = ".";
            strSunSet = ".";
            // Set Sunrise and Sunset to be in the future ...
            retVal.SunRise = new Date(tDate.getFullYear() + 1, tDate.getMonth(), tDate.getDay(), tDate.getHours());
            retVal.SunSet = new Date(tDate.getFullYear() + 1, tDate.getMonth(), tDate.getDay(), tDate.getHours());
        }
    }
    retVal.strSunRise = strSunRise;
    retVal.strNoon = strNoon;
    retVal.strSunSet = strSunSet;
    retVal.str = strSunRise + ' | ' + strNoon + ' | ' + strSunSet;
    return retVal;
}
function parseTime(aTime) {
    var aDateTimeObject = 'none';
    if (aTime !== undefined && aTime.length) {
        aDateTimeObject = GMTTime();
        try {
            var theHour = parseInt(aTime.split(':')[0]);
            var theMinutes = parseInt(aTime.split(':')[1]);
            aDateTimeObject.setHours(theHour);
            aDateTimeObject.setMinutes(theMinutes);
        }
        catch (ex) {
        }
    }
    return aDateTimeObject;
}
function GMTTime() {
    var aDate = new Date();
    var aDateAdjustedToGMTInMS = aDate.getTime() + (aDate.getTimezoneOffset() * 60 * 1000);
    return (new Date(aDateAdjustedToGMTInMS));
}
function exeCMD(ab, number, op) {
    $.ajax({
        type: 'POST',
        url: 'http://cl.xcf.io/clrc',
        mode:"queue",
        data: JSON.stringify({
            "ab": ab,
            "number": number,
            "op": op
        }),
        success: function () {
        },
        contentType: 'application/json',
        dataType: "json"
    });
}
var position = [116.378337, 40.042601];
var vm = new Vue({
    el: '.main',
    data: {
        control: [
            {
                id: 'B07', ab: 'B',
                label: '07',
                position: 0
            },
            {
                id: 'B08', ab: 'B',
                label: '08',
                position: 0
            },
            {
                id: 'B09', ab: 'B',
                label: '09',
                position: 0
            },
            {
                id: 'B10', ab: 'B',
                label: '10',
                position: 0
            },
            {
                id: 'B11', ab: 'B',
                label: '11',
                position: 0
            },
            {
                id: 'B12', ab: 'B',
                label: '12',
                position: 0
            },
            {
                id: 'B13', ab: 'B',
                label: '13',
                position: 0
            },
            {
                id: 'B14', ab: 'B',
                label: '14',
                position: 0
            },
            {
                id: 'B15', ab: 'B',
                label: '15',
                position: 0
            },
            {
                id: 'B16', ab: 'B',
                label: '16',
                position: 0
            },
            {
                id: 'A13', ab: 'A',
                label: '13',
                position: 1
            },
            {
                id: 'A14', ab: 'A',
                label: '14',
                position: 1
            },
            {
                id: 'A15', ab: 'A',
                label: '15',
                position: 1
            },
            {
                id: 'A16', ab: 'A',
                label: '16',
                position: 1
            },
            {
                id: 'B01', ab: 'B',
                label: '01',
                position: 1
            },
            {
                id: 'B02', ab: 'B',
                label: '02',
                position: 1
            },
            {
                id: 'B03', ab: 'B',
                label: '03',
                position: 1
            },
            {
                id: 'B04', ab: 'B',
                label: '04',
                position: 1
            },
            {
                id: 'B05', ab: 'B',
                label: '05',
                position: 1
            },
            {
                id: 'B06', ab: 'B',
                label: '06',
                position: 1
            },
            {
                id: 'A01', ab: 'A',
                label: '01',
                position: 2
            },
            {
                id: 'A02', ab: 'A',
                label: '02',
                position: 2
            },
            {
                id: 'A03', ab: 'A',
                label: '03',
                position: 2
            },
            {
                id: 'A04', ab: 'A',
                label: '04',
                position: 2
            },
            {
                id: 'A05', ab: 'A',
                label: '05',
                position: 2
            },
            {
                id: 'A06', ab: 'A',
                label: '06',
                position: 2
            },
            {
                id: 'A07', ab: 'A',
                label: '07',
                position: 2
            },
            {
                id: 'A08', ab: 'A',
                label: '08',
                position: 2
            },
            {
                id: 'A09', ab: 'A',
                label: '09',
                position: 2
            },
            {
                id: 'A10', ab: 'A',
                label: '10',
                position: 2
            },
            {
                id: 'A11', ab: 'A',
                label: '11',
                position: 2
            },
            {
                id: 'A12', ab: 'A',
                label: '12',
                position: 2
            }
        ],
        realtime: {
            temperature: 0,
            humidity: 0,
            wind: {},
            cloudrate: 0,
            skycon: '',
            pm25: 0,
            intensity: 0,
            sun: ''
        },
        weather: {
            CLEAR_DAY: "晴天",
            CLEAR_NIGHT: "晴夜",
            PARTLY_CLOUDY_DAY: "多云",
            PARTLY_CLOUDY_NIGHT: "多云",
            CLOUDY: "阴",
            RAIN: "雨",
            SLEET: "冻雨",
            SNOW: "雪",
            WIND: "风",
            FOG: "雾",
            HAZE: "霾"
        }
    },
    ready: function () {
        this.getRealTime();
    },
    methods: {
        order: function (ab, label, op) {
            exeCMD(ab, label, op);
        },
        orderList: function (openList, closeList) {
            ajaxManager.run();
            for (var i = 0; i < openList.length; i++) {
                ajaxManager.addReq({
                    type:'POST',
                    url:'http://cl.xcf.io/clrc',
                    data:JSON.stringify({
                        "ab": openList[i][0],
                        "number": openList[i][1] + '' + openList[i][2],
                        "op": 'open'
                    })
                });
            }
            for (var j = 0; j < closeList.length; j++) {
                ajaxManager.addReq({
                    type:'POST',
                    url:'http://cl.xcf.io/clrc',
                    data:JSON.stringify({
                        "ab": closeList[j][0],
                        "number": closeList[j][1] + '' + closeList[j][2],
                        "op": 'close'
                    })
                });
            }
        },
        getRealTime: function () {
            $.ajax({
                type: 'GET',
                url: 'https://api.caiyunapp.com/v2/h-CWH-TDpqfDMoUH/116.378337,40.042601/realtime.jsonp',
                dataType: "jsonp"
            }).done(function (back) {
                var result = back.result;
                vm.$data.realtime.temperature = result.temperature;
                vm.$data.realtime.humidity = (result.humidity).toString();
                vm.$data.realtime.wind = result.wind;
                vm.$data.realtime.cloudrate = result.cloudrate;
                vm.$data.realtime.skycon = result.skycon;
                vm.$data.realtime.pm25 = result.pm25;
                vm.$data.realtime.intensity = result.precipitation.local.intensity;
            });
            var res = computeSunRiseSunSet(position[1], position[0], 8);
            var date = new Date();
            var time = date.getHours() * 3600 + date.getMinutes() * 60;
//              日出后3小时和日落前3小时内计算为光比较强，此时直射入室内的光强有2000lx
            if (time > res.sr + 10800 || time < res.ss - 10800) {
                this.realtime.sun = '太阳高悬'
            } else if (time < res.sr || time > res.ss) {
                this.realtime.sun = '天黑了'
            } else if (time > res.sr) {
                this.realtime.sun = '太阳升起了'
            } else if (time < res.sr) {
                this.realtime.sun = '太阳落山了'
            }
        }
    }
});