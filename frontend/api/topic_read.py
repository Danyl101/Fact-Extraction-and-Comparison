from fastapi import FastAPI,Query

app=FastAPI()

global id
id=0

@app.get("/search")
def search(query:str=Query(...,min_length=1)):
    print("Received query:", query)
    id+=1

    # Example response
    return [
        {"id": id, "title": f"Result for {query}"}
    ]