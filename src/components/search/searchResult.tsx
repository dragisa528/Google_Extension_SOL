import SearchMenu from './serachMenu';
import styles from './SearchResults.module.css';
import PaginationButtons from './pagenation';
export default function SearchResult({results, searchType}:{results:any,searchType:any}){
    return(
        <div  className='container mx-auto'>
            <SearchMenu />
            <div className="mx-auto w-full px-3">
            <p className="text-gray-600 text-md mb-5">
                About {results?.searchInformation?.formattedTotalResults} results
            </p>
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
                <div key={result.cacheId} className="max-w-3xl mb-8">
                    {/* {(index===3) &&
                        <a href={bannerAds[randomBannerAdIndex].link} target="_blank" className="mb-3 inline-block" rel="noreferrer"><Image style={{zIndex:1}} width="728" height="90" alt="banner ad" src={bannerAds[randomBannerAdIndex].image} /></a>
                    } */}
                    <h2 className={styles.resultHeading}>
                        <a href={result.link}>
                            {result.title}
                        </a>
                    </h2>
                    <a href={result.link}  className={styles.link}>
                        {result.displayLink}
                    </a>
                    <div className="flex">
                        { result.pagemap?.cse_thumbnail &&
                            <img src={result.pagemap?.cse_thumbnail[0]?.src}   className={styles.thumbnail} />
                        }
                        <div>
                            <p className="line-clamp-2 text-sm">{result.snippet}</p>
                        </div>
                    </div>
                </div>
            ))}

            <PaginationButtons />
        </div>
        </div>
    )
}