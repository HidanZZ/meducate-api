import { MedFr1 } from '@/models/med_fr1';
import { MedFr2 } from '@/models/med_fr2';
import { MedFr3 } from '@/models/med_fr3';
import { MedFr4 } from '@/models/med_fr4';
import { MedFr5 } from '@/models/med_fr5';
import { MedFr6 } from '@/models/med_fr6';
import { MedFr7 } from '@/models/med_fr7';
import { MedFr8 } from '@/models/med_fr8';
import { MedFr } from '@/models/med_fr';
import { MedFr9 } from '@/models/med_fr9';
import { IMedFr2 } from '@/contracts/med_fr2';
import { IMedFr9 } from '@/contracts/med_fr9';

export const medFrService = {
  helper: async (med2: IMedFr2) => { 
    let med1, med4, med3, med5, med6, med7, med8, med9;
    let medicament = new MedFr();
    if(med2){
      med1= await MedFr1.findOne({ cis_code: med2.cis_code });
      med3= await MedFr3.findOne({ cis_code: med2.cis_code });
      med4= await MedFr4.findOne({ cis_code: med2.cis_code });
      med5= await MedFr5.findOne({ cis_code: med2.cis_code });
      med6= await MedFr6.findOne({ cis_code: med2.cis_code });
      med7= await MedFr7.findOne({ cis_code: med2.cis_code });
      med9 = await MedFr9.findOne({ cis_code: med2.cis_code });
      
      medicament._id = med2._id;
      medicament.cis_code = med2.cis_code;
      medicament.denomination = med2.denomination;
      medicament.forme_pharmaceutique = med2.forme_pharmaceutique;
      medicament.voies_administration = med2.voies_administration;
      medicament.statut_amm = med2.statut_amm;
      medicament.type_procedure_amm = med2.type_procedure_amm;
      medicament.etat_commercialisation = med2.etat_commercialisation;
      medicament.titulaires= med2.titulaires;
      medicament.date_amm = med2.date_amm;
      medicament.surveillance_renforcee = med2.surveillance_renforcee; 
    }
    if(med1){
      medicament.libelle_presentation = med1.libelle_presentation;
      medicament.statut_admin_presentation = med1.statut_admin_presentation;
      medicament.etat_commercialisation_presentation = med1.etat_commercialisation_presentation;
      medicament.date_declaration_commercialisation = med1.date_declaration_commercialisation;
      medicament.prix_medicament = med1.prix_medicament;
      medicament.taux_remboursement = med1.taux_remboursement;
    }
    if(med3){
      medicament.condition_prescription = med3.condition_prescription;
    }
    if(med4){
      medicament.libelle_groupe_generique = med4.libelle_groupe_generique;
    }
    if(med5){
      medicament.motif_evaluation = med5.motif_evaluation;
      medicament.date_avis_ct = med5.date_avis_ct;
      medicament.valeur_asmr = med5.valeur_asmr;
      medicament.libelle_asmr = med5.libelle_asmr;
    }
    if(med7){
      medicament.texte_info_secu = med7.texte_info_secu;
      medicament.date_debut_info_secu = med7.date_debut_info_secu;
      medicament.date_fin_info_secu = med7.date_fin_info_secu;
    }
    if(med6){
      med8 = await MedFr8.findOne({ dossier_has_code : med6.dossier_has_code });
      medicament.dossier_has_code = med6.dossier_has_code;
      medicament.valeur_smr = med6.valeur_smr;
      medicament.libelle_smr = med6.libelle_smr;
      if(med8){
        medicament.lien_avis_ct = med8.lien_avis_ct;
      }
    }
    if(med9){
      medicament.designation_element_pharmaceutique = med9.designation_element_pharmaceutique;
      medicament.denomination_substance = med9.denomination_substance;
      medicament.dosage_substance = med9.dosage_substance;
      medicament.ref_dosage = med9.ref_dosage;
      medicament.nature_composant = med9.nature_composant;
    }
    return medicament;
  },

  helper2: async (med9: IMedFr9) => {
    let med2, med1, med4, med3, med5, med6, med7, med8;
    let medicament = new MedFr();
      if(med9){
        med2 = await MedFr2.findOne({ cis_code: med9.cis_code });  
        med1= await MedFr1.findOne({ cis_code: med9.cis_code });
        med3= await MedFr3.findOne({ cis_code: med9.cis_code });
        med4= await MedFr4.findOne({ cis_code: med9.cis_code });
        med5= await MedFr5.findOne({ cis_code: med9.cis_code });
        med6= await MedFr6.findOne({ cis_code: med9.cis_code });
        med7= await MedFr7.findOne({ cis_code: med9.cis_code });

        medicament._id = med9._id;
        medicament.cis_code = med9.cis_code;
        medicament.designation_element_pharmaceutique = med9.designation_element_pharmaceutique;
        medicament.denomination_substance = med9.denomination_substance;
        medicament.dosage_substance = med9.dosage_substance;
        medicament.ref_dosage = med9.ref_dosage;
        medicament.nature_composant = med9.nature_composant;
        if(med2){
          medicament.denomination = med2.denomination;
          medicament.forme_pharmaceutique = med2.forme_pharmaceutique;
          medicament.voies_administration = med2.voies_administration;
          medicament.statut_amm = med2.statut_amm;
          medicament.type_procedure_amm = med2.type_procedure_amm;
          medicament.etat_commercialisation = med2.etat_commercialisation;
          medicament.titulaires= med2.titulaires;
          medicament.date_amm = med2.date_amm;
          medicament.surveillance_renforcee = med2.surveillance_renforcee; 
        }
        if(med1){
          medicament.libelle_presentation = med1.libelle_presentation;
          medicament.statut_admin_presentation = med1.statut_admin_presentation;
          medicament.etat_commercialisation_presentation = med1.etat_commercialisation_presentation;
          medicament.date_declaration_commercialisation = med1.date_declaration_commercialisation;
          medicament.prix_medicament = med1.prix_medicament;
          medicament.taux_remboursement = med1.taux_remboursement;
        }
        if(med3){
          medicament.condition_prescription = med3.condition_prescription;
        }
        if(med4){
          medicament.libelle_groupe_generique = med4.libelle_groupe_generique;
        }
        if(med5){
          medicament.motif_evaluation = med5.motif_evaluation;
          medicament.date_avis_ct = med5.date_avis_ct;
          medicament.valeur_asmr = med5.valeur_asmr;
          medicament.libelle_asmr = med5.libelle_asmr;
        }
        if(med7){
          medicament.texte_info_secu = med7.texte_info_secu;
          medicament.date_debut_info_secu = med7.date_debut_info_secu;
          medicament.date_fin_info_secu = med7.date_fin_info_secu;
        }
        if(med6){
          med8 = await MedFr8.findOne({ dossier_has_code : med6.dossier_has_code });
          medicament.dossier_has_code = med6.dossier_has_code;
          medicament.valeur_smr = med6.valeur_smr;
          medicament.libelle_smr = med6.libelle_smr;
          if(med8){
            medicament.lien_avis_ct = med8.lien_avis_ct;
          }
        } 
      }
      return medicament;

  },


  getMedicamentByDenomination: async (nomDuMedicament: string) => {
    try {
      let medicament = new MedFr();
      let med2 = await MedFr2.findOne({ denomination: 
        { $regex: `${nomDuMedicament}`, $options: 'i' } });
      let med1, med4, med3, med5, med6, med7, med8;
      // if(med2){
      //   med1= await MedFr1.findOne({ cis_code: med2.cis_code });
      //   med3= await MedFr3.findOne({ cis_code: med2.cis_code });
      //   med4= await MedFr4.findOne({ cis_code: med2.cis_code });
      //   med5= await MedFr5.findOne({ cis_code: med2.cis_code });
      //   med6= await MedFr6.findOne({ cis_code: med2.cis_code });
      //   med7= await MedFr7.findOne({ cis_code: med2.cis_code });
        
      //   medicament._id = med2._id;
      //   medicament.cis_code = med2.cis_code;
      //   medicament.denomination = med2.denomination;
      //   medicament.forme_pharmaceutique = med2.forme_pharmaceutique;
      //   medicament.voies_administration = med2.voies_administration;
      //   medicament.statut_amm = med2.statut_amm;
      //   medicament.type_procedure_amm = med2.type_procedure_amm;
      //   medicament.etat_commercialisation = med2.etat_commercialisation;
      //   medicament.titulaires= med2.titulaires; 
      // }
      // if(med1){
      //   medicament.libelle_presentation = med1.libelle_presentation;
      //   medicament.prix_medicament = med1.prix_medicament;
      // }
      // if(med3){
      //   medicament.condition_prescription = med3.condition_prescription;
      // }
      // if(med4){
      //   medicament.libelle_groupe_generique = med4.libelle_groupe_generique;
      // }
      // if(med7){
      //   medicament.texte_info_secu = med7.texte_info_secu;
      // }
      // if(med6){
      //   med8 = await MedFr8.findOne({ dossier_has_code : med6.dossier_has_code });
      //   medicament.dossier_has_code = med6.dossier_has_code;
      //   if(med8){
      //     medicament.lien_avis_ct = med8.lien_avis_ct;
      //   }
      // }
      if(med2){
        medicament = await medFrService.helper(med2);
      }
      
      console.log(medicament);
      return medicament;
    } catch (error) {
      throw new Error('Error fetching medicament by denomination');
    }
  },

  getMedicamentById: async (_id: string) => {
    try {
      let medicament = new MedFr();
      
      let med2 = await MedFr2.findById({ _id : _id});
      // let med1, med4, med3, med5, med6, med7, med8;
      // if(med2){
      //   med1= await MedFr1.findOne({ cis_code: med2.cis_code });
      //   med3= await MedFr3.findOne({ cis_code: med2.cis_code });
      //   med4= await MedFr4.findOne({ cis_code: med2.cis_code });
      //   med5= await MedFr5.findOne({ cis_code: med2.cis_code });
      //   med6= await MedFr6.findOne({ cis_code: med2.cis_code });
      //   med7= await MedFr7.findOne({ cis_code: med2.cis_code });
        
      //   medicament._id = med2._id;
      //   medicament.cis_code = med2.cis_code;
      //   medicament.denomination = med2.denomination;
      //   medicament.forme_pharmaceutique = med2.forme_pharmaceutique;
      //   medicament.voies_administration = med2.voies_administration;
      //   medicament.statut_amm = med2.statut_amm;
      //   medicament.type_procedure_amm = med2.type_procedure_amm;
      //   medicament.etat_commercialisation = med2.etat_commercialisation;
      //   medicament.titulaires= med2.titulaires;
      //   medicament.date_amm = med2.date_amm;
      //   medicament.surveillance_renforcee = med2.surveillance_renforcee; 
      // }
      // if(med1){
      //   medicament.libelle_presentation = med1.libelle_presentation;
      //   medicament.statut_admin_presentation = med1.statut_admin_presentation;
      //   medicament.etat_commercialisation_presentation = med1.etat_commercialisation_presentation;
      //   medicament.date_declaration_commercialisation = med1.date_declaration_commercialisation;
      //   medicament.prix_medicament = med1.prix_medicament;
      //   medicament.taux_remboursement = med1.taux_remboursement;
      // }
      // if(med3){
      //   medicament.condition_prescription = med3.condition_prescription;
      // }
      // if(med4){
      //   medicament.libelle_groupe_generique = med4.libelle_groupe_generique;
      // }
      // if(med5){
      //   medicament.motif_evaluation = med5.motif_evaluation;
      //   medicament.date_avis_ct = med5.date_avis_ct;
      //   medicament.valeur_asmr = med5.valeur_asmr;
      //   medicament.libelle_asmr = med5.libelle_asmr;
      // }
      // if(med7){
      //   medicament.texte_info_secu = med7.texte_info_secu;
      //   medicament.date_debut_info_secu = med7.date_debut_info_secu;
      //   medicament.date_fin_info_secu = med7.date_fin_info_secu;
      // }
      // if(med6){
      //   med8 = await MedFr8.findOne({ dossier_has_code : med6.dossier_has_code });
      //   medicament.dossier_has_code = med6.dossier_has_code;
      //   medicament.valeur_smr = med6.valeur_smr;
      //   medicament.libelle_smr = med6.libelle_smr;
      //   if(med8){
      //     medicament.lien_avis_ct = med8.lien_avis_ct;
      //   }
      // }
      if(med2){
        medicament = await medFrService.helper(med2);
      }
      console.log(medicament);
      return medicament;
    } catch (error) {
      throw new Error('Error fetching medicament by id');
    }
  },

  getMedicamentByMolecule: async (molecule: string) => {
    try {
      let medicament = new MedFr();
      let med9 = await MedFr9.findOne({ denomination_substance:
        { $regex: `${molecule}`, $options: 'i' } });
      if(med9){
        medicament = await medFrService.helper2(med9);
      }
      console.log(medicament);
      return medicament;

    } catch (error) {
      throw new Error('Error fetching medicament by molecule');
    }
  }
  
}

  


