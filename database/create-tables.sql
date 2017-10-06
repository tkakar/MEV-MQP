create table demo (
primaryid numeric (1000),
caseid numeric (500),
caseversion numeric (10),
i_f_code varchar (1),
event_dt numeric (8),
mfr_dt numeric (8),
init_fda_dt numeric (8),
fda_dt numeric (8),
rept_cod varchar (9),
auth_num varchar (500),
mfr_num varchar (500),
mfr_sndr varchar (300),
lit_ref varchar (1000),
age numeric (12, 2),
age_cod varchar (7),
age_grp varchar (15),
sex varchar (5),
e_sub varchar (1),
wt numeric (14, 5),
wt_cod varchar (20),
rept_dt numeric (8),
to_mfr varchar (100),
occp_cod varchar (300),
reporter_country varchar (500),
occr_country varchar (2));

create table drug (
primaryid numeric (1000),
caseid numeric (500),
drug_seq numeric (10),
role_cod varchar (22),
drugname varchar (500),
prod_ai varchar (500),
val_vbm numeric (22),
route varchar (500),
dose_vbm varchar (300),
cum_dose_chr varchar (15),
cum_dose_unit varchar (50),
dechal varchar (20),
rechal varchar (20),
lot_num varchar (1000),
exp_dt numeric (1000),
nda_num numeric (100),
dose_amt varchar (15),
dose_unit varchar (50),
dose_form varchar (50),
dose_freq varchar (50));

create table indi (
primaryid numeric (1000), 
caseid numeric (500), 
indi_drug_seq numeric (10), 
indi_pt varchar (1000));

create table outc ( 
primaryid numeric (1000),
caseid numeric (500),
outc_cod varchar (4000));

create table reac (
primaryid numeric (1000),
caseid numeric (500),
pt varchar (500),
drug_rec_act varchar (500));

create table rpsr (
primaryid numeric (1000),
caseid numeric (500),
rpsr_cod varchar (32));

create table ther (
primaryid numeric (1000),
caseid numeric (500),
dsg_drug_seq numeric (10),
start_dt numeric (8),
end_dt numeric (8),
dur numeric (150),
dur_cod varchar (500));
