from openai import OpenAI
import json
import os
import re
import logging
import logging_loader

from config_loader import config

logger=logging.getLogger("Semantic_Read")

def embedding_json_read():
    """
    Read all JSON files from the Fact_Embedding_Data directory and return their contents.
    """
    base_dir=config["paths"]["Dataset"]["Fact_Embedding_Data"]
    
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
            
            data = payload
            yield (
                data["article_title"],
                data["embedding"],
                data["fact"],
                data["source"],
                data["article_id"]
            )
            
def semantic_json_write(data):
    base_dir=config["paths"]["Dataset"]["Fact_Comparison_Data"]
    site_dir = os.path.join(base_dir, data["source"])
    # Ensure output directory exists
    os.makedirs(site_dir,exist_ok=True)
    
    # Sanitize title for filesystem safety
    safe_title = re.sub(r"[^\w\-_. ]", "_", data["article_title"]).strip()
    filename = f"{safe_title}.json"
    filepath = os.path.join(site_dir, filename)

    payload = {
        "article_id":data["article_id"],
        "article_title":data["article_title"],
        "source":data["source"],
        "comparisons":data["comparisons"]
    }
    try:
        with open(filepath,"w",encoding="utf-8")as f:
            json.dump(payload,f,indent=2,ensure_ascii=False)
    except Exception as e:
        logger.error(f"Error writing to {filepath}: {e}")
        logger.info(f"Failed to write JSON for article: {data['article_title']}")
        return None
    
    return filepath




