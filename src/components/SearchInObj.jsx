import React, { useState } from 'react';
import YouTube from 'react-youtube';
import { FiSearch } from 'react-icons/fi'
import './Home.css'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { AiOutlineEye } from 'react-icons/ai'
import { MdOutlineWatchLater } from 'react-icons/md'
const ytDuration = require('youtube-duration')
const SearchInObj = (props) => {
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [input, setinput] = useState('');
    const [resultss, setResults] = useState([]);
    const [vid, setvid] = useState('');
    const [mod, setmodal] = useState(false);
    const [time, settime] = useState('');

    const changeTime = (seconds,id) => {
        
        setmodal(true);
        setvid(id);
        settime(parseInt(seconds));
    }
  
    const searchh = (e) => {
        e.preventDefault();
        console.log('search data', searchFor(input));
    }
    function trimString(s) {
        var l = 0, r = s.length - 1;
        while (l < s.length && s[l] === ' ') l++;
        while (r > l && s[r] === ' ') r -= 1;
        return s.substring(l, r + 1);
    }
    function compareObjects(o1, o2) {
        var k = '';
        for (k in o1) if (o1[k] !== o2[k]) return false;
        for (k in o2) if (o1[k] !== o2[k]) return false;
        return true;
    }
    function itemExists(haystack, needle) {
        for (var i = 0; i < haystack.length; i++) if (compareObjects(haystack[i], needle)) return true;
        return false;
    }
    function searchFor(toSearch) {
        toSearch = trimString(toSearch); // trim it
        if (props.data?.length === 0) {
        }
        else {
            props.data?.map((val) => {
                let results = []
                for (var i = 0; i < val.length; i++) {
                    for (var key in val[i]) {
                        if (val[i][key].indexOf(toSearch) != -1) {
                            if (!itemExists(results, val[i])) results.push(val[i]);
                        }
                    }
                }
                return setResults((val) => {
                    return [...val, results]
                });  
            })
        } setinput('')
    }
    return (
        <div>
        <form onSubmit={searchh}>
            <input style={{ marginTop: '10px',width:'50%' }} value={input} onChange={(e) => {
                setinput(e.target.value); setResults([]);
            }} />
            <button style={{ marginTop: '10px' }} onClick={searchh} className='btn-success'><FiSearch /></button></form>
            <h3 style={{ textAlign: 'left', marginLeft: '67px' }}>About {props.id.length} results</h3>
            {props.listcap.map((val, index) => {
                
                return (
                    <>  {(resultss.length === 0) ? <div></div> : 
                    <div key={index} >
                           <div className='container' >
                            <div className="row mt-5 ">
                                <div className="col-lg-12">
                                    <div style={{ display: "flex",}} className="keycard" >
                                        <img src={val?.[0]?.snippet?.thumbnails?.medium?.url} alt="..." width="300px" height="160px" />
                                        <div style={{ marginLeft: "10px",position:'relative' }}>
                                        <div>
                                            <h4 style={{ margin: "0px", textAlign:'left' }} className="card-title"> {val?.[0]?.snippet?.title}</h4>
                                            <p style={{ marginTop: "1px" }} className="card-text text-start">owner {val?.[0]?.snippet?.channelTitle}</p>
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "space-between",position:'absolute',bottom:'0',width:'100%' }}>
                                            <p style={{ fontSize: '15px' }} ><MdOutlineWatchLater /> {ytDuration.format(val[0]?.contentDetails?.duration)}</p>
                                                    <p className="card-text" style={{ marginLeft: "auto", fontSize: '15px' }}><AiOutlineEye /> {props.checkViews(val[0]?.statistics?.viewCount)} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>     
                        <div 
                            className="container-k container cyt overflow-scroll mt-4"
                            style={{ backgroundColor: "#FFF1F3" }}
                        >
                            {resultss[index]?.map((val,index1) => {
                            
                                return (
                                        <div className="row" >
                                            <div>
                                                <hr style={{ color: "red", height: "3px" }} />

                                                <div className="mx-2 mt-0">

                                                    <div
                                                        onClick={() => {changeTime(val?.start,props?.id[index]);onOpenModal() }}
                                                        className="dot-k"
                                                        style={{ top: "-33px" }}
                                                    >
                                                        <div className='outer'></div>
                                                        <div className='inner'></div>
                                                    </div>
                                                    <div style={{ height: '106px', maxHeight: "150px", borderRight: '1px solid #C4C4C4', textAlign: 'left', marginTop: '-14px' }}>
                                                        <p style={{ fontSize: "10px", marginLeft: '-3px', color: 'blue' }}> from {val.start}</p>
                                                        <p
                                                            style={{ fontSize: "13px", wordWrap: "break-word", textOverflow: 'ellipsis' }}
                                                            className="card-text text-truncate"
                                                        >
                                                            {val.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>    
                                );
                            })}
                        </div>
                    </div>
                    }
                    </>
                )
            })}
            <p></p>
            {
                mod &&
                <div style={{zIndex:"100"}}>
            
                    <Modal open={open} onClose={onCloseModal} center>
                           {console.log('kdcd vid=',vid)}
                            <YouTube videoId={vid} opts={{
                                playerVars: {
                                    autoplay: 1,
                                    start: parseInt(time)
                                }

                            }} />
                      
                    </Modal>
                  
   
                </div>
            }
           
        </div>

    );
}

export default SearchInObj;