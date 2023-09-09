from app.service.sample_service import SampleService

# import service class needed

class SampleController():
    def __init__(self):
        pass

    def post_sample():
        result = SampleService.post_sample()
        return result
