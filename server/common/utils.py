def model_to_json(model):
	mtj = dict()
	mtj = {field.name: field.value_from_object(model) if isinstance(field.value_from_object(model), ( int, long ))	 else str(field.value_from_object(model)) for field in model._meta.fields}
	return mtj

def collection_to_json(collection):
	ctj = dict()
	ctj = [model_to_json(model) for model in collection]
	return ctj


class DisableCSRF(object):
    def process_request(self, request):
        setattr(request, '_dont_enforce_csrf_checks', True)