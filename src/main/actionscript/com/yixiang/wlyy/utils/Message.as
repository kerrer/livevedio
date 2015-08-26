package com.yixiang.wlyy.utils
{
	import flash.external.ExternalInterface;	
	//import mx.collections.ArrayCollection;
	
	public class Message
	{   private static var debug_code:String = "yixiangdebug";
		private static var debug:Boolean=false;
		
			
		public static function showDebugMessage(message:String):void
		{
			debug ? ExternalInterface.call("$S.showDebugMessage","AS - "+ message) : 1;
		}		
		
	
		public static function showDialogMessage(message:String):void
		{
			ExternalInterface.call("$S.showDebugMessage",message);
		}
		
		public static function flushPatientQuene(quene:String):void {
			//var queneJson: String = JSON.stringify(quene.toArray());		
			debug ? ExternalInterface.call("$S.flushPatientQuene",quene): 1;
		}
		
		public static function agreePatientVedio(message:String):void {
			debug ? ExternalInterface.call("$S.agreePatientVedio",message): 1;
		}
		
		public static function clearPatientQuene():void {
			debug ? ExternalInterface.call("$S.clearPatientQuene"): 1;
		}
		
		public static function setDebug(code:String):void{
		     //debug = code == debug_code ? true : false;
			debug = true
		}
	}
}