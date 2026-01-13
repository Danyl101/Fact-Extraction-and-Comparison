from fastapi import FastAPI,Query
import logging
import logging_loader

logger=logging.getLogger("Frontend_API_Topic_Read")

app=FastAPI()

@app.get("/search")
def search(query:str=Query(...,min_length=1),limit: int = 5):
    from news_scraper.scrape import scrape
    print("Received query:", query)

    return scrape(query,limit)