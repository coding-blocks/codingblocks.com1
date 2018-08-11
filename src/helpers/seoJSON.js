module.exports = function (courseList, mode, options) {
    if (mode === "all-courses") {
        let data = {}
        data["@context"] = "http://schema.org"
        data["@type"] = "ItemList"
        data["itemListElement"] = []
        let urlList = []
        for (let i = 0; i < courseList.length; i++) {
            try {
                let course = courseList[i]
                let url = `https://www.codingblocks.com/classroom-courses#${course.link.split("/").pop().split('.')[0] || course.id}`
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
            } catch (e) {
                console.log(e)
            }
        }

        return JSON.stringify(data)

    } else if (mode === "course") {

        let course = courseList

        let data = {
            "@context": "http://schema.org/",
            "@type": "Product",
            "name": course.name,
            "image": [
                `https://codingblocks.com${course.imgSrc}`
            ],
            "description": (course.description)?course.description.join('. '): "Description",
            "brand": {
                "@type": "Thing",
                "name": "Coding Blocks"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": course.rating || "5",
                "reviewCount": course.ratingCount || "485"
            },
            "offers": {
                "@type": "Offer",
                "priceCurrency": "INR",
                "price": course.priceint || "0",
                "availability": "http://schema.org/InStock",
                "seller": {
                    "@type": "Organization",
                    "name": "Coding Blocks"
                }
            }
        }

        return JSON.stringify(data)
    }
}
