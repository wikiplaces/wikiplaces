function PreferencesAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
};

PreferencesAssistant.prototype.setup = function() {

	this.appMenuModel = {
                visible: true,
                items: []
        };
        this.controller.setupWidget(Mojo.Menu.appMenu, {omitDefaultItems: true}, this.appMenuModel);

	var cookie=  new Mojo.Model.Cookie("wppref");
	var wppref = cookie.get();
	if(wppref != null)
	{	
		this.lang = wppref.lang; 
	} else {
		this.lang = "en";
	}

	var countryname = "English";
	if (this.lang == "de" ) countryname = "Deutsch";
	if (this.lang == "fr" ) countryname = "Francais";
	if (this.lang == "es" ) countryname = "Espanol";

	this.langchoice = [];
	selectorsModel = { langtype: $L(countryname) };

	this.controller.listen('langselector', Mojo.Event.propertyChange, this.selectorChanged.bindAsEventListener(this));
	this.controller.setupWidget('langselector', {label: $L("Language"), choices: this.langchoice, modelProperty:'langtype'}, selectorsModel);
	
	selectorsModel.choices = [
		{ label: "English", value:"en" },
		{ label: "Deutsch", value:"de" },
		{ label: "Francais", value:"fr" },
		{ label: "Espanol", value:"es" },
	];
	this.controller.modelChanged(selectorsModel);




	/* this function is for setup tasks that have to happen when the scene is first created */
		
	/* use Mojo.View.render to render view templates and add them to the scene, if needed */
	
	/* setup widgets here */
	
	/* add event handlers to listen to events from widgets */
};

PreferencesAssistant.prototype.selectorChanged = function(event) {

//Mojo.Controller.errorDialog(event.value);
var cookie = new Mojo.Model.Cookie("wppref");
	cookie.put({
		lang: event.value,
	});

};

PreferencesAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

PreferencesAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

PreferencesAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
};
