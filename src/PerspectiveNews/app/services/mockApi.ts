// app/services/mockApi.ts
import { NewsArticle } from "../models/NewsArticle"

export const fetchMockNews = async (bias: string, category: string): Promise<NewsArticle[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800))

    // Real news images from reputable sources
    const mockArticles = [
        {
            id: "1",
            headline: "NASA's James Webb Telescope Reveals Stunning New Images of Jupiter",
            thumbnail: "https://www.nasa.gov/sites/default/files/thumbnails/image/main_image_star-forming_region_carina_nircam_final-5mb.jpg",
            biasRating: 0,
            factuality: "high",
            factualityJustification: "Directly reported by NASA with verified images",
            categories: ["science", "space"],
            source: "NASA",
            publishedAt: "2023-05-15T10:30:00Z"
        },
        {
            id: "2",
            headline: "Breakthrough in Nuclear Fusion Achieves Energy Net Gain",
            thumbnail: "https://media.nature.com/lw800/magazine-assets/d41586-022-04440-7/d41586-022-04440-7_23833104.jpg",
            biasRating: 0,
            factuality: "high",
            factualityJustification: "Peer-reviewed study published in Nature",
            categories: ["science", "energy"],
            source: "Nature",
            publishedAt: "2023-05-16T09:15:00Z"
        },
        {
            id: "3",
            headline: "Global Poverty Rate Falls Below 7% for First Time in History",
            thumbnail: "https://www.worldbank.org/content/dam/photos/780x439/2021/dec-1/poverty-shutterstock-780.jpg",
            biasRating: 0.1,
            factuality: "high",
            factualityJustification: "World Bank report with verified data",
            categories: ["world", "economics"],
            source: "World Bank",
            publishedAt: "2023-05-14T14:20:00Z"
        },
        {
            id: "4",
            headline: "New Alzheimer's Drug Shows Promise in Clinical Trials",
            thumbnail: "https://www.science.org/do/10.1126/science.add7243/abs/_20220506_on_alzheimer.jpg",
            biasRating: 0,
            factuality: "medium",
            factualityJustification: "Phase 2 trials completed, awaiting peer review",
            categories: ["health", "science"],
            source: "Science Magazine",
            publishedAt: "2023-05-17T11:45:00Z"
        },
        {
            id: "5",
            headline: "Renewable Energy Now Accounts for Over 30% of Global Electricity",
            thumbnail: "https://media.cnn.com/api/v1/images/stellar/prod/230316143104-01-wind-solar-farm-uk-file.jpg?c=original",
            biasRating: -0.2,
            factuality: "high",
            factualityJustification: "International Energy Agency report",
            categories: ["energy", "environment"],
            source: "CNN",
            publishedAt: "2023-05-13T08:10:00Z"
        }
    ]

    // Filter based on bias and category
    return mockArticles.filter(article => {
        const matchesBias = bias === "good" ?
            Math.abs(article.biasRating) < 0.3 :
            bias === "left" ? article.biasRating > 0.5 :
                bias === "right" ? article.biasRating < -0.5 :
                    true

        const matchesCategory = category === "top" ||
            article.categories.includes(category.toLowerCase())

        return matchesBias && matchesCategory
    })
}