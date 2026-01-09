import os 
import json
import re
import logging
import logging_loader

logger=logging.getLogger("Embedding_write")

from config_loader import config

[{}]

title_cache=[]

def json_write(data):
    """
    Creates a JSON file named after the article title and writes data into it.
    """
    base_dir=config["paths"]["Dataset"]["Fact_Embedding_Data"]
    logger.info(f"Base_dir:{base_dir}, Source:{data}")
    site_dir = os.path.join(base_dir, data["source"])
    # Ensure output directory exists
    os.makedirs(site_dir,exist_ok=True)

    # Sanitize title for filesystem safety
    if data["article_title"] not in title_cache:
        safe_title = re.sub(r"[^\w\-_. ]", "_", data["article_title"]).strip()
        filename = f"{safe_title}.json"
        filepath = os.path.join(site_dir, filename)

        payload = {
            "article_title": data["article_title"],
            "embedding": data["embedding"],
            "fact": data["fact"],
            "source":data["source"]
        }
        title_cache.append(data["article_title"])

    try:
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(payload, f, indent=2, ensure_ascii=False)
    except Exception as e:
        logger.error(f"Error writing to {filepath}: {e}")
        logger.info(f"Failed to write JSON for article: {data['article_title']}")
        return None

    return filepath