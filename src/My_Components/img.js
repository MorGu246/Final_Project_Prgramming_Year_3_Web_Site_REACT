import GetUrl from './getUrl';

export default function Img(props1)
{
    return(
        <>
        <img style={{width:'150px',height:'150px',padding:'2px'}} 
        src={GetUrl(props1.fileName)} alt=""></img>
        </>
    );
}