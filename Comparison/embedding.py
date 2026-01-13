from openai import OpenAI
import os
import json
import logging
import logging_loader
from config_loader import config

from Comparison.embedding_write import json_write

logger=logging.getLogger("Semantic_Read")

client=OpenAI()

def fact_extraction():
    """
    Walk through Fact_Data directory, load facts,
    and compute embeddings for each fact.
    """
    base_dir = config["paths"]["Dataset"]["Fact_Data"]

    all_facts = []

    for root, dirs, files in os.walk(base_dir):
        for filename in files:
            if not filename.endswith(".json"):
                continue

            filepath = os.path.join(root, filename)
            
            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    payload = json.load(f)
            except Exception as e:
                logger.error(f"Error reading {filepath}: {e}")
                continue

            source=os.path.basename(root)
            title=payload.get("article_title", "Unknown")
            facts = payload.get("data", {}).get("facts", [])
            id=payload.get("article_id","Unknown")
            embedding=[]
            facts_list=[]

            try:
                for fact in facts:
                    embedding.append(get_fact_embedding(fact))
                    facts_list.append(fact)
                all_facts.append({
                    "article_id":id,
                    "fact": facts_list,
                    "embedding": embedding,
                    "article_title": title,
                    "source":source
                })
            except Exception as e:
                logger.error(f"Error processing facts from {filepath}: {e} ,source:{source}, title:{title}")
                continue
    return all_facts

embedding_cache = {}

def get_fact_embedding(fact):
    if fact in embedding_cache:
        return embedding_cache[fact]

    try:
        response = client.embeddings.create(
            model="text-embedding-3-small",
            input=fact
        )
    except Exception as e:
        logger.error(f"Error generating embedding for fact: {fact}, Error: {e}")
        raise e
    
    embedding = response.data[0].embedding
    embedding_cache[fact] = embedding
    return embedding

if __name__=="__main__":
    data=fact_extraction()
    for item in data:
        json_write(item)
    