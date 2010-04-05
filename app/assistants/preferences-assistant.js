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
		this.radius = wppref.radius;  
		this.donate = wppref.donate; 
	} else {
		this.lang = "en";
		this.radius = 10;
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


	this.radiuschoice = [];
	selectorsModel2 = { radius: $L(this.radius + " km") };

	this.controller.listen('radiusselector', Mojo.Event.propertyChange, this.selectorChanged2.bindAsEventListener(this));
	this.controller.setupWidget('radiusselector', {label: $L("Radius"), choices: this.radiuschoice, modelProperty:'radius'}, selectorsModel2);
	
	selectorsModel2.choices = [
		{ label: "1 km", value:"1" },
		{ label: "2 km", value:"2" },
		{ label: "5 km", value:"5" },
		{ label: "10 km", value:"10" },
		{ label: "20 km", value:"20" },
		{ label: "50 km", value:"50" },
	];
	this.controller.modelChanged(selectorsModel2);


	tdattr = {trueLabel: 'yes', falseLabel: 'no'};
	tdModel = {value: this.donate, disabled: false};
	
	this.controller.setupWidget('donatetoggle', tdattr, tdModel);
	Mojo.Event.listen(this.controller.get('donatetoggle'),Mojo.Event.propertyChange,this.togglePressed.bind(this));
};

PreferencesAssistant.prototype.selectorChanged = function(event) {
	var cookie = new Mojo.Model.Cookie("wppref");
	cookie.put({
		lang: event.value,
		radius: this.radius,
		donate: tdModel.value,
	});
	this.lang = event.value;
};

PreferencesAssistant.prototype.selectorChanged2 = function(event) {
	var cookie = new Mojo.Model.Cookie("wppref");
	cookie.put({
		lang: this.lang,
		radius: event.value,
		donate: tdModel.value,
	});
	this.radius = event.value;
};

PreferencesAssistant.prototype.togglePressed = function(event) {
	var cookie = new Mojo.Model.Cookie("wppref");
	cookie.put({
		lang: this.lang,
		radius: this.radius,
		donate: tdModel.value,
	});
};

PreferencesAssistant.prototype.activate = function(event) {

};

PreferencesAssistant.prototype.deactivate = function(event) {

};

PreferencesAssistant.prototype.cleanup = function(event) {

};
