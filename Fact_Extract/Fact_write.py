import os
import re
import json
import logging
import logging_loader
from config_loader import config

logger=logging.getLogger("Fact_write")

def json_read():
    base_dir=config["paths"]["Dataset"]["Scraped_Data"]
    for root,dirs,files in os.walk(base_dir):
        for filename in files:
            if not filename.endswith(".json"):
                continue
            
            filepath=os.path.join(root,filename)
            
            try:
                with open(filepath,"r",encoding="utf-8")as f:
                    payload=json.load(f)
            except Exception as e:
                logger.error(f"Error reading {filepath}: {e}")
                continue
    
            for list_content in payload:
                logger.info(f"Payload Content:{list_content}")
                text=list_content["text"]
                source=list_content["source"]
                title=list_content["title"]

                if text and source and title:
                    yield text, source, title
                    
def json_write(article_title, data,article_site):
    """
    Creates a JSON file named after the article title and writes data into it.
    """
    base_dir=config["paths"]["Dataset"]["Fact_Data"]
    site_dir = os.path.join(base_dir, article_site)
    # Ensure output directory exists
    os.makedirs(site_dir,exist_ok=True)

    # Sanitize title for filesystem safety
    safe_title = re.sub(r"[^\w\-_. ]", "_", article_title).strip()
    filename = f"{safe_title}.json"
    filepath = os.path.join(site_dir, filename)

    payload = {
        "article_title": article_title,
        "data": data
    }

    try:
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(payload, f, indent=2, ensure_ascii=False)
    except Exception as e:
        logger.error(f"Error writing to {filepath}: {e}")
        logger.info(f"Failed to write JSON for article: {article_title}")
        return None

    return filepath
