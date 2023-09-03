from app.service.another_sample_service import AnotherSampleService
from app.datasource.sample_gateway import SampleGateway

# import service class needed
# import gateway class needed

class SampleService():
    def __init__(self):
        pass

    def post_sample():
        #do stuff
        #can call other service class
        AnotherSampleService.do_something()
        result = SampleGateway.insert_data()
        return result
    