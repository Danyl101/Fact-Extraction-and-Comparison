                        POST CONSTRUCTION LOG

Tags=[Fact-Extract,Embedding]


# Initial Setup [Fact-Extract]

Since the process of even finetuning a model for fact extraction cost us alot of compute , i instead decided to use a gpt api to acquire facts from text in a structured manner , this removed alot of issues we had since gpt-api is incredibly robust , like having to clean heavily , proper segmenting without information loss 

____________________________

# Iteration 1 [Fact-Extract]

A possibility arose where GPT would produce output in its own format , which could cause data storing issues , so set up a validation function to ensure the entire data is in similar format and also set temperature to 0 , to ensure that model dosent drift and set up retry logic in case the data had issues

____________________________

# Iteration 2 [Fact-Extract]

Set up a read/write function , where the reader is a generator that reads from the scraped json files and passes the values into GPT-API call function , and the outputs are written into a json file , also created article_ids , to uniquely identify each article using hash library

____________________________
____________________________

# Initial Setup [Embedding]





