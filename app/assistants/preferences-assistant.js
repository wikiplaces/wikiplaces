function PreferencesAssistant() {

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
		this.donate = wppref.donate; 
	} else {
		this.lang = "en";
		this.donate = true;
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


	tdattr = {trueLabel: 'yes', falseLabel: 'no'};
	tdModel = {value: this.donate, disabled: false};
	
	this.controller.setupWidget('donatetoggle', tdattr, tdModel);
	Mojo.Event.listen(this.controller.get('donatetoggle'),Mojo.Event.propertyChange,this.togglePressed.bind(this));
};

PreferencesAssistant.prototype.selectorChanged = function(event) {
	var cookie = new Mojo.Model.Cookie("wppref");
	cookie.put({
		lang: event.value,
		donate: tdModel.value,
	});
	this.lang = event.value;
};

PreferencesAssistant.prototype.togglePressed = function(event) {
	var cookie = new Mojo.Model.Cookie("wppref");
	cookie.put({
		lang: this.lang,
		donate: tdModel.value,
	});
};

PreferencesAssistant.prototype.activate = function(event) {

};

PreferencesAssistant.prototype.deactivate = function(event) {

};

PreferencesAssistant.prototype.cleanup = function(event) {

};
