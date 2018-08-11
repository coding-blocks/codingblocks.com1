const seo = module.exports = (courses, current, options) => {
    
    if (current === "courses") {
        let data = {}
        data["@context"] = "http://schema.org"
        data["@type"] = "ItemList"
        data["itemListElement"] = []
        
        let urlList = []
        
        for (let i = 0; i < courses.length; i++) {
            let course = courses[i]
            let url = `https://www.codingblocks.com/classroom-courses#${course.link.split("/").pop() || course.id}`
            
            if (urlList.indexOf(url) > -1) continue
            
            urlList.push(url)
            let obj = {
                "@type": "ListItem",
                "position": i+1,
                "item": {
                    "@context": "http://schema.org",
                    "@type": "Course",
                    "name": course.name,
                    "description": (course.description)?course.description.join('. '): "Description",
                    "provider": {
                        "@type": "Organization",
                        "name": "Coding Blocks",
                        "sameAs": "https://online.codingblocks.com/"
                    },
                    "url": url
                }
            }
            
            if (!obj.item.description) obj.item.description = "Description"
            data["itemListElement"].push(obj)
        }
         return JSON.stringify(data)
         
     } else if (current === "course") {
         
         let course = courses
         let data = {
            "@context": "http://schema.org/",
            "@type": "Product",
            "name": course.name,
            "image": [
                `https://codingblocks.com${course.imgSrc}`
            ],
            "description": (course.description)?course.description.join('. '): "Description",
            "brand": {
                "@type": "Brand",
                "name": "Coding Blocks"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": course.rating || "5",
                "reviewCount": course.reviewCount || "496"
            },
            "offers": {
                "@type": "Offer",
                "priceCurrency": "INR",
                "price": course.priceint || "0",
                "availability": "http://schema.org/InStock",
                "seller": {
                    "@type": "Organization",
                    "name": "Coding Blocks",
                    "sameAs": "https://online.codingblocks.com/"
                }
            }
        }
        
         return JSON.stringify(data)
    }
}