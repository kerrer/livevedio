package com.yixiang.wlyy.introvertIM
{
	import flash.events.Event;

	public class IMReadyEvent extends Event
	{
		// ------- Public Constants -------
		public static const APP_READY:String = "appready";
		
		
		// ------- Private vars -------
		private var _ready:Boolean;
		
		
		public function IMReadyEvent(type:String, ready:Boolean){
			super(type, true);
			_ready = ready;;
		}
		
		// ------- Public Properties -------
		public function get ready():Boolean
		{
			return _ready;
		}

		
		public override function clone():Event {
			return new IMReadyEvent(type, _ready);
		}
		
	}
}