import axios from 'axios'
function createLrcObj(lrc) {
    var oLRC = {
        ti: "", //歌曲名
        ar: "", //演唱者
        al: "", //专辑名
        by: "", //歌词制作人
        offset: 0, //时间补偿值，单位毫秒，用于调整歌词整体位置
        ms: [] //歌词数组{t:时间,c:歌词}
    };
    if (lrc.length == 0) return;
    var lrcs = lrc.split('\n'); //用回车拆分成数组
    for (var i in lrcs) { //遍历歌词数组
        lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
        var t = lrcs[i].substring(lrcs[i].indexOf("[") + 1, lrcs[i].indexOf("]")); //取[]间的内容
        var s = t.split(":"); //分离:前后文字
        if (isNaN(parseInt(s[0]))) { //不是数值
            for (var i in oLRC) {
                if (i != "ms" && i == s[0].toLowerCase()) {
                    oLRC[i] = s[1];
                }
            }
        } else { //是数值
            var arr = lrcs[i].match(/\[(\d+:.+?)\]/g); //提取时间字段，可能有多个
            var start = 0;
            for (var k in arr) {
                start += arr[k].length; //计算歌词位置
            }
            var content = lrcs[i].substring(start); //获取歌词内容
            for (var k in arr) {
                var t = arr[k].substring(1, arr[k].length - 1); //取[]间的内容
                var s = t.split(":"); //分离:前后文字
                oLRC.ms.push({ //对象{t:时间,c:歌词}加入ms数组
                    t: (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3),
                    c: content
                });
            }
        }
    }
    oLRC.ms.sort(function (a, b) { //按时间顺序排序
        return a.t - b.t;
    });
    return oLRC
}
export default {
    namespaced: true,
    state: {
        musicId: '',
        musicImg: '',
        musicSonger: '',
        musicDt: '',
        musicUrl: '',
        musicName: '',
        musicHotCommit: '',
        musicCommit: '',
        musicLyric: '',
        api: 'http://www.eveal.cn:3003',
        pt:0,
        isPlay:false
    },
    mutations: {
        updateMusicUrl(state, obj) {//加载歌曲信息
            state.musicDt = obj.dt
            state.musicId = obj.id
            state.musicSonger = obj.ar.map(item => item.name).join('/')
            state.musicImg = obj.al.picUrl
            state.musicName = obj.name
        },
        updatePlayUrl(state, url) {//加载歌曲播放地址
            state.musicUrl = url
        },
        updateCommit(state, obj) {//加载歌曲评论
            state.musicHotCommit = obj.hotComments
            state.musicCommit = obj.comments
        },
        updateMusicLyric(state, obj) {//加载歌曲歌词
            state.musicLyric = obj
        },
        updatePt(state, pt){//更新播放时间
            state.pt = pt
        },
        updatePlay(state, bool){//更新播放状态
            state.isPlay = bool
        }
    },
    actions: {
        loadMusicUrl(context, id) {//请求数据
            axios.get(context.state.api + '/song/detail?ids=' + id).then(res => {//歌曲信息
                // console.log( res.data.songs[0])
                context.commit('updateMusicUrl', res.data.songs[0])
            })
            axios.get(context.state.api + '/song/url?id=' + id).then(res => {//播放地址
                context.commit('updatePlayUrl', res.data.data[0].url)
            })
            axios.get(context.state.api + '/comment/music?&limit=100&id=' + id).then(res => {//歌曲评论
                // 
               const hotComments =  res.data.hotComments.map(item => ({
                   time:item.time,
                   liked:item.likedCount,
                   content:item.content,
                   user:{
                       name:item.user.nickname,
                       avatar:item.user.avatarUrl,
                   }
               }))
               const comments =  res.data.comments.map(item => ({
                time:item.time,
                liked:item.likedCount,
                content:item.content,
                user:{
                    name:item.user.nickname,
                    avatar:item.user.avatarUrl,
                }
            }))
               
                context.commit('updateCommit', {hotComments,comments})
            })
            axios.get(context.state.api + '/lyric?id=' + id).then(res => {//歌曲歌词
                let lr = ''
                if(res.data.lrc){
                    lr = createLrcObj(res.data.lrc.lyric)//解析歌词
                }else{
                    lr = ""
                }
                context.commit('updateMusicLyric', lr)
            })
            
        }
    }
}