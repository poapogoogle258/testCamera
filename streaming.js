const {spawn} = require('child_process')

const camaras_url = [ 
    {
        'login' : 'admin:obt123456',
        'ip' : '192.168.1.60',
        'channels' : 102
    },{
        'login' : 'admin:obt123456',
        'ip' : '192.168.1.61',
        'channels' : 102
    }
]

const stream_camera = camaras_url.map((info) => {

    const stream = spawn('ffmpeg',argsFFmpeg(info))
    
    return stream
})

function argsFFmpeg(info){
    return [
        '-i',`rtsp://${info.login}@${info.ip}/Streaming/Channels/${info.channels}`,
        '-rtsp_transport','tcp',
        '-rtsp_flags','listen',
        '-c:v','copy',
        '-f','hls',
        '-strftime','1',
        '-hls_flags','2',
        '-hls_time','2',
        '-hls_list_size','2',
        '-hls_segment_filename',`public/video/${info.ip}_${info.channels}_%Y%m%d-%s.ts`,
        '-y',`public/video/${info.ip}_${info.channels}.m3u8`
    ]
}