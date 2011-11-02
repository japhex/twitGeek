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
        format.html { redirect_to @term, :notice => 'Term was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render :action => "edit" }
        format.json { render :json => @term.errors, :status => :unprocessable_entity }
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
    @termCountAll = Term.group(:name).count(:name)
    #@termCountAll = Term.find(:all, :select => 'count(*) count, name', :group => 'name', :limit => 5, :order => 'count DESC')
    @termCountToday = Term.group(:name).count(:name, :conditions => ['created_at >= ?', Time.zone.now.at_beginning_of_day])
    #@termCountToday = Term.find(:all, :select => 'count(*) count, name', :conditions => ['created_at >= ?', Time.zone.now.at_beginning_of_day], :group => 'name', :limit => 5, :order => 'count DESC')
    @terms = Term.all(:order => 'id DESC')
    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @terms }
    end    
  end
end
