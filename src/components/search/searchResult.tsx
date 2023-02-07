import SearchMenu from './serachMenu';
import styles from './SearchResults.module.css';
import PaginationButtons from './pagenation';
import {useEffect} from 'react';
// import {Adsense} from '@ctrl/react-adsense';
import GoogleAd from '../GoogleAd';


export default function SearchResult({results, searchType}:{results:any,searchType:any}){
    useEffect(()=>{
        document.getElementById("Footer")!.style!.position='relative';
    },[])

    // componentDidMount () {
    //     (window.adsbygoogle = window.adsbygoogle || []).push({
    //           google_ad_client: "ca-pub-5090203590318254",
    //           enable_page_level_ads: true
    //      });
    // }

    return(
        // <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5090203590318254" crossorigin="anonymous"></script>
        <div className='mx-auto md:container lg:container xl:container'>
            <SearchMenu />
            <div className="mx-auto w-full px-3">
            <p className="text-gray-600 text-md mb-5">
                About {results?.searchInformation?.formattedTotalResults} results
            </p>
            {/* <Adsense
                client="ca-pub-5090203590318254"
                slot="f08c47fec0942fa0"
                style={{ display: 'block' }}
                layout="in-article"
                format="fluid"
            /> */}
            {/* <Adsense
                client="ca-pub-5090203590318254"
                slot="f08c47fec0942fa0"
            /> */}
            <div style={{textAlign:'center', position:'absolute', right:'10px', zIndex:'500', width:'300px', height:'262px'}} className="xs:hidden sm:hidden lg:block md:block">
                <GoogleAd
                    client="ca-pub-5090203590318254"
                    slot="1091219617"
                    className="lg"
                    style={{display:'inline-block'}}
                    // format="rectangle"
                />
                {/* <amp-auto-ads type="adsense"
                    data-ad-client="ca-pub-5090203590318254">
                </amp-auto-ads> */}
            </div>

            {searchType === 'image' &&
                <div className="grid max-w-3xl mb-8 grid-flow-row sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                { results?.items?.map((result:any) => (
                    <a key={result.cacheId} href={result.image.contextLink}   className={styles.link}>
                        <div className="p-1">
                            <img src={result.link} alt={result.title} />
                            <p>{result.title}</p>
                        </div>
                    </a>
                ))}
                </div>
            }
            {searchType !== 'image' && results?.items?.map((result:any) => (
                <>
                {/* <!-- Mid-Results --> */}
                <ins className="adsbygoogle"
                    style={{display:'block'}}
                    data-ad-client="ca-pub-5090203590318254"
                    data-ad-slot="1091219617"
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({});
                </script>

                <div key={result.cacheId} className="max-w-3xl mb-8">
                    {/* {(index===3) &&
                        <a href={bannerAds[randomBannerAdIndex].link} target="_blank" className="mb-3 inline-block" rel="noreferrer"><Image style={{zIndex:1}} width="728" height="90" alt="banner ad" src={bannerAds[randomBannerAdIndex].image} /></a>
                    } */}
                    <h2 className={styles.resultHeading}>
                        <a href={result.link} target="_blank" rel="noopener noreferrer">
                            {result.title}
                        </a>
                    </h2>
                    <a href={result.link}  className={styles.link} target="_blank" rel="noopener noreferrer"> 
                        {result.displayLink}
                    </a>
                    <div className="flex">
                        { result.pagemap?.cse_thumbnail &&
                            <img src={result.pagemap?.cse_thumbnail[0]?.src} className={styles.thumbnail} />
                        }
                        <div>
                            <p className="line-clamp-2 text-sm">{result.snippet}</p>
                        </div>
                    </div>
                </div>
                </>
            ))}

            <PaginationButtons />
        </div>
        </div>
    )
}

export const config = { amp: true };