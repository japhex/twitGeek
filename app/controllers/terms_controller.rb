class TermsController < ApplicationController
  before_filter :authenticate_user!, :except => [:show, :index]
  
  # GET /terms
  # GET /terms.json
  def index
    @terms = Term.all
    @term = Term.new
    @user = current_user
    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @user.terms }
    end
  end

  # GET /terms/1
  # GET /terms/1.json
  def show
    @term = Term.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @term }
    end
  end

  # GET /terms/new
  # GET /terms/new.json
  def new
    @term = Term.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render :json => @term }
    end
  end

  # GET /terms/1/edit
  def edit
    @term = Term.find(params[:id])
  end

  # POST /terms
  # POST /terms.json
  def create
    @term = Term.new(params[:term])
    @terms = Term.all(:order => 'id DESC')
    @termCountAll = Term.group(:name).count(:name, :order => 'count_name DESC')
    @termCountToday = Term.group(:name).count(:name, :conditions => ['created_at >= ?', Time.zone.now.at_beginning_of_day], :order => 'count_name DESC')    
    respond_to do |format|
      if @term.save
        format.html { redirect_to @term, :notice => 'Term was successfully created.' }
        format.json { render :json => @term, :status => :created, :location => @term }
        format.js
      else
        format.html { render :action => "new" }
        format.json { render :json => @term.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /terms/1
  # PUT /terms/1.json
  def update
    @term = Term.find(params[:id])

    respond_to do |format|
      if @term.update_attributes(params[:term])
        format.js        
        format.html { redirect_to @term, :notice => 'Term was successfully updated.' }
        format.json { respond_with_bip(@term) }
      else
        format.html { render :action => "edit" }
        format.json { respond_with_bip(@term) }
      end
    end
  end

  # DELETE /terms/1
  # DELETE /terms/1.json
  def destroy
    @term = Term.find(params[:id])
    @term.destroy

    respond_to do |format|
      format.js
      format.html { redirect_to terms_url }
      format.json { head :ok }
    end
  end
  
  def community
    @term = Term.new
    @termCountAll = Term.group(:name).count(:name, :order => 'count_name DESC')
    @termCountToday = Term.group(:name).count(:name, :conditions => ['created_at >= ?', Time.zone.now.at_beginning_of_day], :order => 'count_name DESC')
    @terms = Term.all(:order => 'id DESC')
    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @terms }
    end    
  end
end
