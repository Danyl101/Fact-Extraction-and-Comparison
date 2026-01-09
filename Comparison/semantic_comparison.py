import numpy as np

from Comparison.semantic_read import embedding_json_read

def cosine_similarity(a, b):
    a = np.array(a)
    b = np.array(b)
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def load_articles():
    articles = {}

    for title, embedding, fact, source, article_id in embedding_json_read():
        if article_id not in articles:
            articles[article_id] = {
                "article_title": title,
                "source": source,
                "facts": [],
                "embeddings": []
            }

        articles[article_id]["facts"].append(fact)
        articles[article_id]["embeddings"].append(embedding)

    return articles

def run_comparison(main_article_id,threshold):
    articles = load_articles()
    if main_article_id not in articles:
        raise ValueError("Anchor article not found")

    anchor = articles[main_article_id]
    others = {
        aid: art for aid, art in articles.items()
        if aid != main_article_id
    }

    return compare_anchor_to_others(anchor, others,threshold)

def compare_anchor_to_others(anchor, others, threshold):
    results = {}

    anchor_facts = anchor["fact"]
    anchor_embeddings = anchor["embedding"]

    for other_id, other in others.items():
        other_facts = other["fact"]
        other_embeddings = other["embedding"]

        comparisons = []

        for a_fact, a_emb in zip(anchor_facts, anchor_embeddings):
            best_match = None
            best_score = -1.0

            for o_fact, o_emb in zip(other_facts, other_embeddings):
                score = cosine_similarity(a_emb, o_emb)

                if score > best_score:
                    best_score = score
                    best_match = o_fact

            comparisons.append({
                "anchor_fact": a_fact,
                "best_match": best_match,
                "score": best_score,
                "verdict": "Match" if best_score >= threshold else "Mismatch"
            })

        results[other_id] = {
            "article_title": other["article_title"],
            "source": other["source"],
            "comparisons": comparisons
        }

    return results

    


