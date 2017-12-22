package com.common;

public class WorkFlowException extends Exception{

	private static final long serialVersionUID = 1L;

	
	public WorkFlowException(){
		
	}
	
	public WorkFlowException(String message){
		super(message);
	}
}
